import React, { useState } from 'react';
import classes from './UpdateCountryModal.module.scss';

import { setCountryForUpdate } from '@/store/admin/countries/slices/countriesPageSlice'
import { closeUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice';
import { useAppDispatch, useAppSelector } from '@/pages/hooks/_shared/redux';
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
              placeholder={country?.name}
              onChange={e => handleSetName(e.target.value)}
            />
            <p>Путь:</p>
            <input placeholder={country?.pathFragment} onChange={e => handleSetPthFragment(e.target.value)}/>
            <p>URL изображения:</p>
            <input placeholder={country?.flagImageUrl} onChange={e => handleSetFlagImageUrl(e.target.value)}/>
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