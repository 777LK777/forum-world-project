import { useEffect, useState } from 'react';
import { 
    useGetAllCountriesQuery, 
    useCreateCountryMutation, 
    useChangeCountryMutation,
    useDeleteCountryMutation 
} from '@/store/admin/countries/countries.api';

import UpdateCountryModal from '../../../components/admin/countries/UpdateCountryModal/UpdateCountryModal';
import DeleteConfirmModal from '../../../components/_shared/DeleteConfirmModal/DeleteConfirmModal';
import classes from './Countries.module.scss';
import AppButton from '../../../components/_shared/UI/AppButton/AppButton';
import AppInput from '../../../components/_shared/UI/AppInput/AppInput';
import { closeUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice'

import { useAppDispatch, useAppSelector } from '@/pages/hooks/_shared/redux';
import { closeDeleteModal, resetDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';
import AdminSidebar from '@/components/admin/countries/AdminSidebar/AdminSidebar';
import CountriesList from '@/components/admin/countries/CountriesList/CountriesList';

const Countries = () => {

  const { data } = useGetAllCountriesQuery();
  const [createCountry] = useCreateCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();
  const [updateCountry] = useChangeCountryMutation();
  
  const [nameValue, setNameValue] = useState('');
  const [flagValue, setFlagValue] = useState('');
  const [pathValue, setPathValue] = useState('');

  const dispatch = useAppDispatch();
  const { countryToUpdate, countryToDelete } = useAppSelector(state => state.countriesPageSlice) 
  const { isOpen } = useAppSelector(state => state.updateCountryModalSlice)
  const { isOpen: isDeleteModalOpen, isDeleteSelected } = useAppSelector(state => state.deleteModalSlice)

  useEffect(() => {
    dispatch(closeDeleteModal())
    if (!countryToDelete?.id) return;
    if (!isDeleteSelected) return;    
    deleteCountry(countryToDelete.id);
    dispatch(resetDeleteModal());
  }, [isDeleteSelected])


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

  useEffect(() => {
    dispatch(closeUpdateCountry());
    if (!countryToUpdate) return;
    updateCountry(countryToUpdate);
  }, [countryToUpdate])

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
        <h1 className={classes.title}>Управление странами</h1>
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
          (data! && data.length!) > 0 ? (
            <CountriesList data={data}/>
          ) : null
        }
      </div>
    </div>

    </>
  );
};

export default Countries;