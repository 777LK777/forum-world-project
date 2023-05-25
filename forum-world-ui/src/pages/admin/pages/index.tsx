// outside
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '@/hooks/_shared/redux';

// css 
import classes from './Pages.module.scss';
// ant design
import { Form, Input } from 'antd';

// components
import AdminSidebar from "@/components/_shared/AdminSidebar/AdminSidebar";
import AppButton from "@/components/_shared/UI/AppButton/AppButton";
import PagesList from "@/components/admin/pages/PagesList/PagesList";

// modals 
import DeleteConfirmModal from "@/components/_shared/DeleteConfirmModal/DeleteConfirmModal";
import UpdatePageModal from "@/components/admin/pages/UpdatePageModal/UpdatePageModal";

// slices
import { useChangePageMutation, useCreatePageContentMutation, useCreatePageMutation, useDeletePageContentMutation, useDeletePageMutation, useGetAllPagesQuery, useLazyGetPageContentQuery, useUpdatePageContentMutation } from "@/store/admin/pages/pages.api";
import { closeUpdatePage } from "@/store/admin/pages/slices/updatePageModalSlice";
import { closeDeleteModal, resetDeleteModal } from "@/store/admin/countries/slices/deleteConfirmModal";
import { openContentEditorModal, resetContentEditorModal } from "@/store/admin/_shared/slices/contentEditorModalSlice";
import { resetPagePageSlice } from "@/store/admin/pages/slices/pagesPageSlice";
import ContentEditorModal from "@/components/_shared/ContentEditorModal/ContentEditorModal";


const Pages = () => {

    // PREPARE
    const { data } = useGetAllPagesQuery();
    const dispatch = useAppDispatch();
    const { pageToDelete, pageToUpdate } = useAppSelector(state => state.pagesPageSlice);

    // PAGE
    // create
    const [createPage, {isError: isErrorCreate}] = useCreatePageMutation();
    const [pageValue, setPageValue] = useState('');
    const [pathValue, setPathValue] = useState('');

    const [form] = Form.useForm();

    const addPageHandle = async (e: any) => {
        e.preventDefault();
        if (pageValue.length < 2) {
            alert('Страница должна содержать минимум 2 символа.')
            return;
        }
        if (pathValue.length < 1) {
            alert('Путь должен содержать минимум 1 символ.');
            return;
        }

        await createPage({
            name: pageValue,
            pathFragment: pathValue
        })
        form.resetFields();
        setPageValue('');
        setPathValue('');
    }

    useEffect(() => {
        if (isErrorCreate) alert('Не удалось добавить страницу');
    }, [isErrorCreate])

    // update
    const [updatePage] = useChangePageMutation();

    useEffect(() => {
        dispatch(closeUpdatePage());
        if (!pageToUpdate) return;
        updatePage(pageToUpdate);
    }, [pageToUpdate])

    // delete 
    const [ deletePage ] = useDeletePageMutation();
    const { isOpen: isDeleteModalOpen, isDeleteSelected } = useAppSelector(state => state.deleteModalSlice);
    const {isOpen} = useAppSelector(state => state.updatePageModalSlice)

    useEffect(() => {
        dispatch(closeDeleteModal());
        if (!pageToDelete?.id) return;
        if (!isDeleteSelected) return;
        deletePage(pageToDelete.id);
        dispatch(resetDeleteModal());
    }, [isDeleteSelected]);

    // CONTENT
    const {
        isOpen: isOpenContentEditorModal, 
        contentToSave, 
        isDeleteConfirm: isDeleteContentSelected, 
        isEditDeclined: isContentEditDeclined 
    } = useAppSelector(state => state.contentEditorModalSlice)

    // create/update
    const [createContent] = useCreatePageContentMutation();
    const [updateContent] = useUpdatePageContentMutation();
    const { pageToContentEdit } = useAppSelector(state => state.pagesPageSlice);
    const [getPageContent, results] = useLazyGetPageContentQuery();

    useEffect(() => {
        if (!pageToContentEdit) return;
        getPageContent(pageToContentEdit);
    }, [pageToContentEdit]);

    useEffect(() => {
        if (!results.data) return;
        if (results.isFetching) return;
        if (results.data.id === 0) {
            dispatch(openContentEditorModal(results.data));
        } else {
            dispatch(openContentEditorModal(results.data));
        }
    }, [results])

    useEffect(() => {
        if (!pageToContentEdit?.id) return;
        if(!contentToSave) return;

        if (!contentToSave.id) createContent({
            pageId: pageToContentEdit.id,
            content: contentToSave
        }) 
        else updateContent({
            pageId: pageToContentEdit.id,
            content: contentToSave
        })

        dispatch(resetContentEditorModal());
        dispatch(resetPagePageSlice());
    }, [contentToSave])

    // delete 
    const [deleteContent] = useDeletePageContentMutation();
    
    useEffect(() => {
        if (!pageToContentEdit?.id) return;
        if (!isDeleteContentSelected) return;
        deleteContent(pageToContentEdit.id);

        dispatch(resetContentEditorModal());
        dispatch(resetPagePageSlice());
    }, [isDeleteContentSelected])

    // edit decline
    useEffect(() => {
        dispatch(resetContentEditorModal());
        dispatch(resetPagePageSlice());
    }, [isContentEditDeclined])

    // design
    const [hamburgerOpened, setHamburgerOpened] = useState(false);
    const hamburgerHandle = () => {
        if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
    }

    return (
        <>
            {isOpenContentEditorModal && <ContentEditorModal/>}
            {isDeleteModalOpen && (<DeleteConfirmModal message="Вы хотите удалить страницу"/>)}
            {isOpen && <UpdatePageModal/>}
            <div onClick={hamburgerHandle} className={classes.hamburger__container}>
                {
                hamburgerOpened ? 
                    <div className={classes.close}>
                    <span className={classes.close__line}></span>
                    <span className={classes.close__line}></span>
                    </div>
                : 
                    <div className={classes.hamburger}>
                    <span className={classes.hamburger__line}></span>
                    <span className={classes.hamburger__line}></span>
                    <span className={classes.hamburger__line}></span>
                    </div>
                }
            </div>
            <AdminSidebar open={hamburgerOpened}/>
            <div className={classes.main}>
                <h1 className={classes.title}>Управление страницами</h1>
                <Form form={form} className={classes.form}> 
                    <Form.Item name="page" rules={[{ required: true, message: 'Имя страницы не может быть пустым' }]}>
                        <Input
                            allowClear
                            placeholder="Add page"
                            value={pageValue}
                            onChange={(e: any) => setPageValue(e.target.value)}
                            className={classes.input}
                        />
                    </Form.Item>                  
                    <Form.Item name="path" rules={[{ required: true, message: 'Путь страницы не может быть пустым' }]}>
                        <Input
                            allowClear
                            placeholder="Add path"
                            value={pathValue}
                            onChange={(e: any) => setPathValue(e.target.value.replace(/\//g, ""))}
                            className={classes.input}
                        />
                    </Form.Item>
                    <Form.Item>
                        <AppButton children="Добавить страницу" onClick={addPageHandle}/>
                    </Form.Item>

                </Form>
                {
                    (data! && data.length!) > 0 ? (
                        <PagesList
                            data={data}
                        />
                    ) : null
                }
            </div>
        </>
    )
}

export default Pages;