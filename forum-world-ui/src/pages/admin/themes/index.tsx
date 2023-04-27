import AppInput from '@/components/_shared/UI/AppInput/AppInput';
import classes from './Themes.module.scss'
import AdminSidebar from "@/components/admin/countries/AdminSidebar/AdminSidebar";
import { useState, useEffect } from 'react';
import AppButton from '@/components/_shared/UI/AppButton/AppButton';
import { useChangeThemeMutation, useCreateThemeMutation, useDeleteThemeMutation, useGetAllThemesQuery } from '@/store/admin/themes/themes.api';
import ThemesList from '../../../components/admin/themes/ThemesList/ThemesList';
import { useAppDispatch, useAppSelector } from '@/pages/hooks/_shared/redux';
import DeleteConfirmModal from '@/components/_shared/DeleteConfirmModal/DeleteConfirmModal';
import { closeDeleteModal, resetDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';
import { closeUpdateTheme } from '@/store/admin/themes/slices/updateThemeModalSlice';
import UpdateThemeModal from '@/components/admin/themes/UpdateThemeModal/UpdateThemeModal';

const Themes = () => {
    const { data } = useGetAllThemesQuery();
    const [ createTheme ] = useCreateThemeMutation();
    const [ deleteTheme ] = useDeleteThemeMutation();
    const [ updateTheme ] = useChangeThemeMutation();

    const [themeValue, setThemeValue] = useState('');
    const [pathValue, setPathValue] = useState('');

    const dispatch = useAppDispatch();
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
            setThemeValue('');
            setPathValue('');
        } catch (error) {
            console.log(error);
            alert('Не удалось добавить тему')
        }
    }

    useEffect(() => {
        dispatch(closeUpdateTheme());
        if (!themeToUpdate) return;
        updateTheme(themeToUpdate);
    }, [themeToUpdate])

    const [hamburgerOpened, setHamburgerOpened] = useState(false)
    const hamburgerHandle = () => {
      if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
    }

    return (
        <div>
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
                <form className={classes.form}> 
                    <AppInput
                        placeholder="Add theme"
                        value={themeValue}
                        onChange={(e: any) => setThemeValue(e.target.value)}
                    />
                    <AppInput
                        placeholder="Add path"
                        value={pathValue}
                        onChange={(e: any) => setPathValue(e.target.value)}
                    />
                    <AppButton children="Добавить тему" onClick={addThemeHandle}/>
                </form>
                {
                    (data! && data.length!) > 0 ? (
                        <ThemesList 
                            data={data}
                        />
                    ) : null
                }
            </div>
        </div>
    )
}

export default Themes;