import React, { useState } from 'react';
import classes from './UpdateCountryModal.module.scss';

import { setCountryForUpdate } from '@/store/admin/countries/slices/countriesPageSlice'
import { closeUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/_shared/redux';
import { ICountry } from '@/models/ICountry';

const UpdateCountryModal = () => {

  const dispatch = useAppDispatch();
  const { country } = useAppSelector(state => state.updateCountryModalSlice)

  const [name, setName] = useState(country?.name)
  const [pathFragment, setPathFragment] = useState(country?.pathFragment)
  const [flagImageUrl, setFlagImageUrl] = useState(country?.flagImageUrl)
  
  const handleSetName = (input: string) => setName(input); 
  const handleSetPthFragment = (input: string) => setPathFragment(input); 
  const handleSetFlagImageUrl = (input: string) => setFlagImageUrl(input); 

  const handleConfirm = () => {
    const changedCountry = { ...country, name: name, pathFragment: pathFragment, flagImageUrl: flagImageUrl } as ICountry
    dispatch(setCountryForUpdate(changedCountry))
    dispatch(closeUpdateCountry())
  };

  return (
    
    <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>
            <p>Страна:</p>
            <input
              className={classes.input}
              placeholder={country?.name}
              onChange={e => handleSetName(e.target.value)}
              value={name}
            />
            <p>Путь:</p>
            <input 
              className={classes.input}
              placeholder={country?.pathFragment} 
              onChange={e => handleSetPthFragment(e.target.value)}
              value={pathFragment}
            />
            <p>URL изображения:</p>
            <input 
              className={classes.input}
              placeholder={country?.flagImageUrl} 
              onChange={e => handleSetFlagImageUrl(e.target.value)}
              value={flagImageUrl}
            />
            <img src={country?.flagImageUrl} height={36} width={70}/>
          </div>
          <div className={classes.modalButtons}>
            <button onClick={() => dispatch(closeUpdateCountry())} className={classes.modalCancelButton}>
              Отмена
            </button>
            <button onClick={handleConfirm} className={classes.modalConfirmButton}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default UpdateCountryModal;