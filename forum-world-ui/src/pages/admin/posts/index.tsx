import { useState, useEffect } from "react";
import classes from './Posts.module.scss'
import AdminSidebar from "@/components/admin/countries/AdminSidebar/AdminSidebar";
import AppInput from "@/components/_shared/UI/AppInput/AppInput";
import AppButton from "@/components/_shared/UI/AppButton/AppButton";
import { useChangePostMutation, useCreatePostMutation, useDeletePostMutation, useGetAllPostsQuery } from "@/store/admin/posts/posts.api";
import { useAppDispatch, useAppSelector } from "@/pages/hooks/_shared/redux";
import { closeDeleteModal, resetDeleteModal } from "@/store/admin/countries/slices/deleteConfirmModal";
import { closeUpdatePost } from "@/store/admin/posts/slices/updatePostModalSlice";
import PostsList from "@/components/admin/posts/PostsList/PostsList";
import DeleteConfirmModal from "@/components/_shared/DeleteConfirmModal/DeleteConfirmModal";
import UpdatePostModal from "@/components/admin/posts/UpdatePostModal/UpdatePostModal";
import { useDebounce } from "@/pages/hooks/_shared/debounce";
import { useGetThemesByNameFragmentQuery } from "@/store/admin/themes/themes.api";
import { useGetCountriesByNameFragmentQuery } from "@/store/admin/countries/countries.api";

const Posts = () => {
    const { data } = useGetAllPostsQuery();
    const [ createPost ] = useCreatePostMutation();
    const [ deletePost ] = useDeletePostMutation();
    const [ updatePost ] = useChangePostMutation();

    const [postValue, setPostValue] = useState('');

    const dispatch = useAppDispatch();
    const {postToDelete, postToUpdate} = useAppSelector(state => state.postsPageSlice);
    const { isOpen: isDeleteModalOpen, isDeleteSelected } = useAppSelector(state => state.deleteModalSlice);
    const {isOpen} = useAppSelector(state => state.updatePostModalSlice)

    useEffect(() => {
        dispatch(closeDeleteModal());
        if (!postToDelete?.id) return;
        if (!isDeleteSelected) return;
        deletePost(postToDelete.id);
        dispatch(resetDeleteModal());
    }, [isDeleteSelected])

    const addPostHandle = async (e: any) => {
        e.preventDefault();
        if (postValue.length < 2) {
            alert('Название поста должно содержать минимум 2 символа');
            return;
        }
        try {
            await createPost({
                name: postValue,
                countryId: countryId!,
                themeId: themeId
            })
            setPostValue('');
            setSearchTheme('');
            setSearchCountry('');
        } catch (error) {
            console.log(error);
            alert('Не удалось добавить пост');
        }
    }

    useEffect(() => {
        dispatch(closeUpdatePost());
        if (!postToUpdate) return;
        updatePost(postToUpdate);
    }, [postToUpdate])

    const [hamburgerOpened, setHamburgerOpened] = useState(false)
    const hamburgerHandle = () => {
      if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
    }

    const [searchCountry, setSearchCountry] = useState('');
    const debouncedCountry = useDebounce(searchCountry);
    const {data: countries} = useGetCountriesByNameFragmentQuery(debouncedCountry, {
        skip: debouncedCountry.length < 1
    })

    const [dropdownCountries, setDropdownCountries] = useState(false);

    useEffect(() => {
        setDropdownCountries(debouncedCountry.length > 2 && countries?.length! > 0)
    }, [debouncedCountry, countries])

    const [countryId, setCountryId] = useState(undefined);

    const handleDropdownCountryClick = (country: any) => {
        setCountryId(country.id)
        setSearchCountry(country.name)
        setDropdownCountries(false)
    }

    const [searchTheme, setSearchTheme] = useState('');
    const debouncedTheme = useDebounce(searchTheme);
    const {data: themes} = useGetThemesByNameFragmentQuery(debouncedTheme, {
        skip: debouncedTheme.length < 1
    })

    const [dropdownThemes, setDropdownThemes] = useState(false)

    useEffect(() => {
        setDropdownThemes(debouncedTheme.length > 2 && themes?.length! > 0);
    }, [debouncedTheme, themes])

    const [themeId, setThemeId] = useState(undefined);
    const handleDropdownThemeClick = (theme: any) => {
        setThemeId(theme.id)
        setSearchTheme(theme.name)
        setDropdownThemes(false);
    }

    return (
        <div>
            {isDeleteModalOpen && (<DeleteConfirmModal message="Удалить пост?"/>)}
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
                <form className={classes.form}> 
                    <AppInput
                        placeholder="Add post"
                        value={postValue}
                        onChange={(e: any) => setPostValue(e.target.value)}
                    />

                    <div className={classes.dropdownContainer}>
                        <AppInput
                            placeholder="Search country"
                            value={searchCountry}
                            onChange={(e: any) => setSearchCountry(e.target.value)}
                            onBlur={() => setTimeout(() => {setDropdownCountries(false)}, 1000) }
                        />
                        {dropdownCountries &&
                            <ul className={classes.dropdown}>
                            {
                                countries?.map(country => (
                                    <li 
                                        key={country.id}
                                        onClick={() => handleDropdownCountryClick(country)}
                                        className={classes.dropdown__item}
                                    >
                                        {country.name}
                                    </li>
                                ))
                            }
                            </ul>
                        }

                    </div>

                    <div className={classes.dropdownContainer}>
                        <AppInput
                            placeholder="Search theme"
                            value={searchTheme}
                            onChange={(e: any) => setSearchTheme(e.target.value)}
                            onBlur={() => setTimeout(() => {setDropdownThemes(false)}, 1000) }
                        />
                        {dropdownThemes &&
                            <ul className={classes.dropdown}>
                            {
                                themes?.map(theme => (
                                    <li 
                                        key={theme.id}
                                        onClick={() => handleDropdownThemeClick(theme)}
                                        className={classes.dropdown__item}
                                    >
                                        {theme.name}
                                    </li>
                                ))
                            }
                            </ul>
                        }

                    </div>
                    <AppButton children="Добавить пост" onClick={addPostHandle}/>
                </form>
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