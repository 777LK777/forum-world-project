// outside
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/_shared/redux';
import { useDebounce } from '@/hooks/_shared/debounce';

// css
import classes from './UpdatePostModal.module.scss';
import { Input, Select } from 'antd';

// model
import { IPost } from '@/models/IPost';

// slices
import { setPostForUpdate } from '@/store/admin/posts/slices/postsPageSlice';
import { closeUpdatePost } from '@/store/admin/posts/slices/updatePostModalSlice';
import { useGetAllCountriesQuery, useGetCountriesByNameFragmentQuery } from '@/store/admin/countries/countries.api';
import { useGetAllThemesQuery, useGetThemesByNameFragmentQuery } from '@/store/admin/themes/themes.api';


const UpdatePostModal = () => {
    const dispatch = useAppDispatch();
    const { post } = useAppSelector(state => state.updatePostModalSlice);

    const [postName, setPostName] = useState(post?.name);
    const handleSetPostName = (input: string) => setPostName(input);

    const [searchCountry, setSearchCountry] = useState('');
    const [countryId, setCountryId] = useState(undefined);
    const { data: allCountries } = useGetAllCountriesQuery();

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

    const handleConfirm = () => {
        const theme = themeId !== undefined 
          ?  {
            id: +themeId!, 
            name: searchTheme
          }
          : undefined;

        const country = {
          id: countryId!, 
          name: searchCountry
        }

        const changedPost = {
          id: post?.id, 
          name: postName, 
          country: country, 
          theme: theme
        } as IPost;
        dispatch(setPostForUpdate(changedPost));
        dispatch(closeUpdatePost());
    }
    
    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>
            <p>Пост:</p>
            <Input
              allowClear
              className={classes.input}
              placeholder={post?.name}
              onChange={e => handleSetPostName(e.target.value)}
              value={postName}
            />
            <p>Страна:</p>
            <Select
              className={classes.input}
              allowClear
              showSearch
              placeholder={post?.country.name}
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
            <p>Тема:</p>
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
          </div>
          <div className={classes.modalButtons}>
            <button onClick={() => dispatch(closeUpdatePost())} className={classes.modalCancelButton}>
              Отмена
            </button>
            <button onClick={handleConfirm} className={classes.modalConfirmButton}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    )
}

export default UpdatePostModal;