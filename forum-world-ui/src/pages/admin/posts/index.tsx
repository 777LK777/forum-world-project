// outside
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/_shared/redux";

// css
import classes from './Posts.module.scss'

// antd
import { Select, Input, Form } from "antd";

// components
import AdminSidebar from "../../../components/_shared/AdminSidebar/AdminSidebar";
import AppButton from "@/components/_shared/UI/AppButton/AppButton";
import PostsList from "@/components/admin/posts/PostsList/PostsList";
import DeleteConfirmModal from "@/components/_shared/DeleteConfirmModal/DeleteConfirmModal";
import UpdatePostModal from "@/components/admin/posts/UpdatePostModal/UpdatePostModal";

// slices
import { 
    useChangePostMutation, 
    useCreatePostContentMutation, 
    useCreatePostMutation, 
    useDeletePostContentMutation, 
    useDeletePostMutation, 
    useGetAllPostsQuery, 
    useLazyGetPostContentQuery, 
    useUpdatePostContentMutation
} from "@/store/admin/posts/posts.api";
import { closeDeleteModal, resetDeleteModal } from "@/store/admin/countries/slices/deleteConfirmModal";
import { closeUpdatePost } from "@/store/admin/posts/slices/updatePostModalSlice";
import { useGetAllThemesQuery } from "@/store/admin/themes/themes.api";
import { useGetAllCountriesQuery } from "@/store/admin/countries/countries.api";
import { openContentEditorModal, resetContentEditorModal } from "@/store/admin/_shared/slices/contentEditorModalSlice";
import { resetPostPageSlice } from "@/store/admin/posts/slices/postsPageSlice";
import ContentEditorModal from "@/components/_shared/ContentEditorModal/ContentEditorModal";

const Posts = () => {

    // PREPARE
    const dispatch = useAppDispatch();
    const { data } = useGetAllPostsQuery();
    const {postToDelete, postToUpdate} = useAppSelector(state => state.postsPageSlice);

    // POST
    // create
    const [ createPost ] = useCreatePostMutation();
    const [postValue, setPostValue] = useState('');
    const [searchCountry, setSearchCountry] = useState('');
    const [countryId, setCountryId] = useState(undefined);
    const { data: allCountries} = useGetAllCountriesQuery()

    const handleChangeCountry = (value: any, obj: any) => {
        setCountryId(value ? value : undefined)
        setSearchCountry(obj ? obj.name : null)
    }
    
    const [searchTheme, setSearchTheme] = useState('');
    const [themeId, setThemeId] = useState(undefined);
    const {data: allThemes} = useGetAllThemesQuery();

    const handleChangeTheme = (value: any, obj: any) => {
        setThemeId(value ? value : undefined)
        setSearchTheme(obj ? obj.name : null)
    };

    const [form] = Form.useForm()

    const addPostHandle = async (e: any) => {
        e.preventDefault();
        if (postValue.length < 2) {
            alert('Название поста должно содержать минимум 2 символа');
            return;
        }
        if (searchCountry === "") {
            alert('Страна не должна быть пустая');
            return;
        }
        try {
            await createPost({
                name: postValue,
                country: {
                    id: countryId!,
                    name: searchCountry
                },
                theme: {
                    id: themeId!,
                    name: searchTheme
                }
            })
            form.resetFields();
            setPostValue('');
            setSearchTheme('');
            setSearchCountry('');
        } catch (error) {
            console.log(error);
            alert('Не удалось добавить пост');
        }
    }
    
    // update 
    const [ updatePost ] = useChangePostMutation();

    useEffect(() => {
        dispatch(closeUpdatePost());
        if (!postToUpdate) return;
        updatePost(postToUpdate);
    }, [postToUpdate])
    
    // delete
    const [ deletePost ] = useDeletePostMutation();
    const { isOpen: isDeleteModalOpen, isDeleteSelected } = useAppSelector(state => state.deleteModalSlice);
    const {isOpen} = useAppSelector(state => state.updatePostModalSlice)
    
    useEffect(() => {
        dispatch(closeDeleteModal());
        if (!postToDelete?.id) return;
        if (!isDeleteSelected) return;
        deletePost(postToDelete.id);
        dispatch(resetDeleteModal());
    }, [isDeleteSelected])

    // CONTENT
    const {
        isOpen: isOpenContentEditorModal, 
        contentToSave, 
        isDeleteConfirm: isDeleteContentSelected, 
        isEditDeclined: isContentEditDeclined 
    } = useAppSelector(state => state.contentEditorModalSlice)

    // create/update
    const [createContent] = useCreatePostContentMutation();
    const [updateContent] = useUpdatePostContentMutation();
    const { postToContentEdit } = useAppSelector(state => state.postsPageSlice);
    const [getPostContent, results] = useLazyGetPostContentQuery();

    useEffect(() => {
        if (!postToContentEdit) return;
        getPostContent(postToContentEdit);
    }, [postToContentEdit]);

    useEffect(() => {
        if (!results.data) return;
        if (results.isFetching) return;
        if (results.data.id === 0) dispatch(openContentEditorModal(results.data));
        else dispatch(openContentEditorModal(results.data));
    }, [results])

    useEffect(() => {
        if (!postToContentEdit?.id) return;
        if (!contentToSave) return;

        if (!contentToSave.id) createContent({postId: postToContentEdit.id, content: contentToSave});
        else updateContent({postId: postToContentEdit.id, content: contentToSave});

        dispatch(resetContentEditorModal())
        dispatch(resetPostPageSlice())
    }, [contentToSave])

    // delete 
    const [deleteContent] = useDeletePostContentMutation();
    useEffect(() => {
        if (!postToContentEdit?.id) return;
        if (!isDeleteContentSelected) return;
        deleteContent(postToContentEdit.id);

        dispatch(resetContentEditorModal());
        dispatch(resetPostPageSlice());
    },[isDeleteContentSelected])

    // edit decline
    useEffect(() => {
        dispatch(resetContentEditorModal());
        dispatch(resetPostPageSlice());
    }, [isContentEditDeclined])

    // hamburger
    const [hamburgerOpened, setHamburgerOpened] = useState(false)
    const hamburgerHandle = () => {
      if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
    }

    return (
        <div>
            { isOpenContentEditorModal && <ContentEditorModal/> }
            {isDeleteModalOpen && (<DeleteConfirmModal message="Вы хотите удалить пост?"/>)}
            {isOpen && <UpdatePostModal/>}
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
                <h1 className={classes.title}>Управление постами</h1>
                <Form form={form} className={classes.form}> 
                    <Form.Item name="post" rules={[{ required: true, message: 'Пост не может быть пустым' }]}>
                        <Input
                            allowClear
                            placeholder="Add post"
                            value={postValue}
                            onChange={(e: any) => setPostValue(e.target.value)}
                            className={classes.input}
                        />
                    </Form.Item>                  

                    <Form.Item name="country" rules={[{ required: true, message: 'Страна не может быть пустой' }]}>
                        <Select
                            className={classes.input}
                            allowClear
                            showSearch
                            placeholder="Search country"
                            optionFilterProp="children"
                            filterOption={(input, option) => 
                                option?.label.toLowerCase().indexOf(input.toLowerCase()) !== -1
                            }
                            filterSort={(optionA, optionB) => 
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }
                            options={allCountries?.map(obj => ({
                                value: obj.id,
                                label: obj.name
                            }))}
                            onChange={handleChangeCountry}
                        />
                    </Form.Item> 

                    <Form.Item name="theme">
                        <Select
                            className={classes.input}
                            allowClear
                            showSearch
                            placeholder="Search theme"
                            optionFilterProp="children"
                            filterOption={(input, option) => 
                                option?.label.toLowerCase().indexOf(input.toLowerCase()) !== -1
                            }
                            filterSort={(optionA, optionB) => 
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }
                            options={allThemes?.map(obj => ({
                                value: obj.id,
                                label: obj.name
                            }))}
                            onChange={handleChangeTheme}
                        />
                    </Form.Item>
                    <Form.Item>
                        <AppButton children="Добавить пост" onClick={addPostHandle}/>
                    </Form.Item>

                </Form>
                {
                    (data! && data.length!) > 0 ? (
                        <PostsList
                            data={data}
                        />
                    ) : null
                }
            </div>
        </div>
    )
}

export default Posts