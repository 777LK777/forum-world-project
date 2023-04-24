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
import AdminSidebar from '@/components/admin/countries/AdminSidebar/AdminSidebar';

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

  const [hamburgerOpened, setHamburgerOpened] = useState(false)
  
  const hamburgerHandle = () => {
    if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
  }

  return (
    <>
    <>{ isOpen && (<UpdateCountryModal />) }</>
    <>{ isDeleteModalOpen && window.innerWidth > 1024 && (<DeleteConfirmModal message={"Вы хотите удалить страну?"}/>) }</>
    <div>
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
        <h1 className={classes.title}>Добавление/изменение стран</h1>
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
                key={country.id}
                country={country} 
                onUpdateCountryStart={() => handleUpdateCountry(country)}
                onDeleteCountryFinish={() => {}}
              />
            </>
          ))}
        </ul>
      </div>
    </div>

    </>
  );
};

export default Countries;