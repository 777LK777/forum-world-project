import React, { useState } from 'react';
import classes from './UpdatePostModal.module.scss';
import { useAppDispatch, useAppSelector } from '@/pages/hooks/_shared/redux';
import { IPost } from '@/models/IPost';
import { setPostForUpdate } from '@/store/admin/posts/slices/postsPageSlice';
import { closeUpdatePost } from '@/store/admin/posts/slices/updatePostModalSlice';

const UpdatePostModal = () => {
    const dispatch = useAppDispatch();
    const { post } = useAppSelector(state => state.updatePostModalSlice);

    const [name, setName] = useState(post?.name);
    const [country, setCountry] = useState(post?.countryId);
    const [theme, setTheme] = useState(post?.themeId);

    const handleSetName = (input: string) => setName(input);
    const handleSetCountry = (input: number) => setCountry(input);
    const handleSetTheme = (input: number) => setTheme(input);
    
    const handleConfirm = () => {
        const changedPost = {...post, name: name, countryId: country, themeId: theme} as IPost;
        dispatch(setPostForUpdate(changedPost));
        dispatch(closeUpdatePost());
    }

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>
            <p>Пост:</p>
            <input
              className={classes.input}
              placeholder={post?.name}
              onChange={e => handleSetName(e.target.value)}
              value={name}
            />
            <p>Страна:</p>
            <input
              className={classes.input}
              placeholder={`${post?.countryId}`}
              onChange={e => handleSetCountry(+e.target.value)}
              value={country}
            />
            <p>Тема:</p>
            <input
              className={classes.input}
              placeholder={`${post?.themeId}`}
              onChange={e => handleSetTheme(+e.target.value)}
              value={theme}
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