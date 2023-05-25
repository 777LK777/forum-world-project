// outside
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks/_shared/redux";

// css
import classes from './UpdateThemeModal.module.scss';

// models
import { ITheme } from '@/models/ITheme';

//slices
import { setThemeForUpdate } from '@/store/admin/themes/slices/themesPageSlice';
import { closeUpdateTheme } from '@/store/admin/themes/slices/updateThemeModalSlice';

const UpdateThemeModal = () => {
    
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.updateThemeModalSlice);

    const [name, setName] = useState(theme?.name);
    const [pathFragment, setPathFragment] = useState(theme?.pathFragment);

    const handleSetName = (input: string) => setName(input); 
    const handleSetPthFragment = (input: string) => setPathFragment(input);

    const handleConfirm = () => {
        const changedTheme = {...theme, name: name, pathFragment: pathFragment} as ITheme;
        dispatch(setThemeForUpdate(changedTheme));
        dispatch(closeUpdateTheme())
    };

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>
            <p>Страна:</p>
            <input
              className={classes.input}
              placeholder={theme?.name}
              onChange={e => handleSetName(e.target.value)}
              value={name}
            />
            <p>Путь:</p>
            <input 
              className={classes.input}
              placeholder={theme?.pathFragment} 
              onChange={e => handleSetPthFragment(e.target.value)}
              value={pathFragment}
            />
          </div>
          <div className={classes.modalButtons}>
            <button onClick={() => dispatch(closeUpdateTheme())} className={classes.modalCancelButton}>
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

export default UpdateThemeModal;