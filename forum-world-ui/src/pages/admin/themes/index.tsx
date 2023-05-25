// outside
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/_shared/redux';

// css
import classes from './Themes.module.scss';

// ant design
import { Form, Input } from 'antd';

// components
import AdminSidebar from '@/components/_shared/AdminSidebar/AdminSidebar';
import AppButton from '@/components/_shared/UI/AppButton/AppButton';
import ThemesList from '../../../components/admin/themes/ThemesList/ThemesList';

// modals
import DeleteConfirmModal from '@/components/_shared/DeleteConfirmModal/DeleteConfirmModal';
import UpdateThemeModal from '@/components/admin/themes/UpdateThemeModal/UpdateThemeModal';

// slices
import { 
    useChangeThemeMutation, 
    useCreateThemeMutation, 
    useDeleteThemeMutation, 
    useGetAllThemesQuery 
} from '@/store/admin/themes/themes.api';
import { closeDeleteModal, resetDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';
import { closeUpdateTheme } from '@/store/admin/themes/slices/updateThemeModalSlice';

const Themes = () => {

    // PREPARE
    const { data } = useGetAllThemesQuery();
    const dispatch = useAppDispatch();

    // THEME
    // create
    const [ createTheme ] = useCreateThemeMutation();
    const [themeValue, setThemeValue] = useState('');
    const [pathValue, setPathValue] = useState('');

    const [form] = Form.useForm();

    const addThemeHandle = async (e: any) => {
        e.preventDefault();
        if (themeValue.length < 2) {
            alert('Тема должна содержать минимум 2 символа.');
            return;
        }
        if (pathValue.length < 2) {
            alert('Путь должен содержать минимум 2 символа.');
            return;
        }

        try {
            await createTheme({
                name: themeValue,
                pathFragment: pathValue
            })
            form.resetFields();
            setThemeValue('');
            setPathValue('');
        } catch (error) {
            console.log(error);
            alert('Не удалось добавить тему')
        }
    }
    
    // delete/update
    const [ deleteTheme ] = useDeleteThemeMutation();
    const [ updateTheme ] = useChangeThemeMutation();

    const {themeToDelete, themeToUpdate} = useAppSelector(state => state.themesPageSlice);
    const { isOpen: isDeleteModalOpen, isDeleteSelected } = useAppSelector(state => state.deleteModalSlice);
    const { isOpen } = useAppSelector(state => state.updateThemeModalSlice)

    useEffect(() => {
        dispatch(closeDeleteModal());
        if (!themeToDelete?.id) return;
        if (!isDeleteSelected) return;
        deleteTheme(themeToDelete.id);
        dispatch(resetDeleteModal());
    }, [isDeleteSelected])

    useEffect(() => {
        dispatch(closeUpdateTheme());
        if (!themeToUpdate) return;
        updateTheme(themeToUpdate);
    }, [themeToUpdate])

    //  design
    const [hamburgerOpened, setHamburgerOpened] = useState(false)
    const hamburgerHandle = () => {
      if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
    }

    return (
        <>
            { isDeleteModalOpen && (<DeleteConfirmModal message="Удалить тему?"/>) }
            { isOpen && <UpdateThemeModal/> }
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
                <h1 className={classes.title}>Управление темами</h1>
                <Form form={form} className={classes.form}> 
                  <Form.Item name="name" rules={[{ required: true, message: 'Имя темы не может быть пустым' }]}>
                    <Input
                        allowClear
                        placeholder="Add theme"
                        value={themeValue}
                        onChange={(e: any) => setThemeValue(e.target.value)}
                        className={classes.input}
                    />
                  </Form.Item>
                  <Form.Item name="path" rules={[{ required: true, message: 'Путь темы не может быть пустым' }]}>
                    <Input
                        allowClear
                        placeholder="Add path"
                        value={pathValue}
                        onChange={(e: any) => setPathValue(e.target.value)}
                        className={classes.input}
                    />
                  </Form.Item>
                  <Form.Item>
                    <AppButton children="Добавить тему" onClick={addThemeHandle}/>
                  </Form.Item>
                </Form>
                {
                    (data! && data.length!) > 0 ? (
                        <ThemesList 
                            data={data}
                        />
                    ) : null
                }
            </div>
        </>
    )
}

export default Themes;