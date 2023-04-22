import { useEffect, useState } from 'react';
import { 
    useGetAllCountriesQuery, 
    useCreateCountryMutation, 
    useChangeCountryMutation,
    useDeleteCountryMutation 
} from '@/store/admin/countries/countries.api';

import UpdateCountryModal from '../../../components/admin/countries/UpdateCountryModal/UpdateCountryModal';
import DeleteConfirmModal from '../../../components/admin/countries/DeleteConfirmModal/DeleteConfirmModal';
import classes from './Countries.module.scss';
import AppButton from '../../../components/_shared/UI/AppButton/AppButton';
import AppInput from '../../../components/_shared/UI/AppInput/AppInput';
import CountryItem from '../../../components/admin/countries/CountryItem/CountryItem';
import { ICountry } from '@/models/ICountry';
import { openUpdateCountry, closeUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice'

import { useAppDispatch, useAppSelector } from '@/pages/hooks/_shared/redux';
import { closeDeleteModal, resetDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';

const Countries = () => {

  const { data } = useGetAllCountriesQuery();
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useChangeCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();
  
  const dispatch = useAppDispatch();
  const { countryToUpdate, countryToDelete } = useAppSelector(state => state.countriesPageSlice) 
  const { isOpen, country: selectedCountryToUpdate } = useAppSelector(state => state.updateCountryModalSlice)
  const { isOpen: isDeleteModalOpen, isDeleteSelected } = useAppSelector(state => state.deleteModalSlice)

  const handleUpdateCountry = (country?: ICountry) => {    
    if (country === undefined) return;
    dispatch(openUpdateCountry(country))
  };

  useEffect(() => {
    dispatch(closeUpdateCountry())
    if (!countryToUpdate) return;
    updateCountry(countryToUpdate)
  }, [countryToUpdate])

  useEffect(() => {
    dispatch(closeDeleteModal())
    if (!countryToDelete?.id) return;
    if (!isDeleteSelected) return;    
    deleteCountry(countryToDelete.id);
    dispatch(resetDeleteModal());
  }, [isDeleteSelected])


  const [nameValue, setNameValue] = useState('');
  const [flagValue, setFlagValue] = useState('');
  const [pathValue, setPathValue] = useState('');


  const addCountryHandle = async (e: any) => {
    e.preventDefault();
    if (nameValue.length < 2) {
      alert('Имя страны должно содержать минимум 2 символа.');
      return;
    }
    if (flagValue.length < 2) {
      alert('URL флага должен содержать минимум 2 символа.');
      return;
    }
    if (pathValue.length < 2) {
      alert('Путь должен содержать минимум 2 символа.');
      return;
    }
    try {
      await createCountry({
        name: nameValue,
        pathFragment: pathValue,
        flagImageUrl: flagValue,
      });
      setNameValue('');
      setFlagValue('');
      setPathValue('');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить страну');
    }
  };

  return (
    <>
    <>{ isOpen && (<UpdateCountryModal />) }</>
    <>{ isDeleteModalOpen && window.innerWidth > 1024 && (<DeleteConfirmModal message={"Вы хотите удалить страну?"}/>) }</>
    <div className={classes.main}>
    <h1 className={classes.title}>Добавление страны</h1>
    <form className={classes.form}>
      <AppInput 
          placeholder="Add country name" 
          value={nameValue} 
          onChange={(e: any) => setNameValue(e.target.value)} 
      />
      <AppInput
        placeholder="Add country flagURL"
        value={flagValue}
        onChange={(e: any) => setFlagValue(e.target.value)}
      />
      <AppInput 
          placeholder="Add country path" 
          value={pathValue} 
          onChange={(e: any) => setPathValue(e.target.value)} 
      />
      <AppButton children="Добавить страну" onClick={addCountryHandle} />
    </form>
    {
      (data && data.length > 0) ? 
        <li className={classes.listTitle}>
          <div>Страна</div>
          <div>Путь</div>
          <div className={classes.url}>URL флага</div>
          <div className={classes.flag}>Флаг</div>
        </li>
        : null
    }

    <ul className={classes.list}>
      {
        data?.map((country) => (
        <>
          <CountryItem 
            country={country} 
            onUpdateCountryStart={() => handleUpdateCountry(country)}
            onDeleteCountryFinish={() => {}}
          />
        </>
      ))}
    </ul>
  </div>
    </>
  );
};

export default Countries;