// outside
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks/_shared/redux";

// css
import classes from './UpdatePageModal.module.scss';

// models 
import { IPage } from '@/models/IPage';

// slices
import { setPageForUpdate } from '@/store/admin/pages/slices/pagesPageSlice';
import { closeUpdatePage } from '@/store/admin/pages/slices/updatePageModalSlice';

const UpdatePageModal = () => {

    const dispatch = useAppDispatch();
    const { page } = useAppSelector(state => state.updatePageModalSlice);

    const [name, setName] = useState(page?.name);
    const [pathFragment, setPathFragment] = useState(page?.pathFragment);

    const handleSetName = (input: string) => setName(input); 
    const handleSetPathFragment = (input: string) => setPathFragment(input);

    const handleConfirm = () => {
        const changedPage = {
            ...page,
            name: name,
            pathFragment: pathFragment
        } as IPage;
        dispatch(setPageForUpdate(changedPage));
        dispatch(closeUpdatePage());
    };

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>
            <p>Страница:</p>
            <input
              className={classes.input}
              placeholder={page?.name}
              onChange={e => handleSetName(e.target.value)}
              value={name}
            />
            <p>Путь:</p>
            { page?.pathFragment === '/' ? 
              <input
                className={classes.input}
                value={pathFragment}
                disabled
              />
              :  
              <input 
                className={classes.input}
                placeholder={page?.pathFragment} 
                onChange={e => handleSetPathFragment(e.target.value.replace(/\//g, ""))}
                value={pathFragment}
              />
            }
          </div>
          <div className={classes.modalButtons}>
            <button onClick={() => dispatch(closeUpdatePage())} className={classes.modalCancelButton}>
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

export default UpdatePageModal;