// outside
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/_shared/redux';

// css
import classes from './Countries.module.scss';

// components
import AppButton from '@/components/_shared/UI/AppButton/AppButton';
import AdminSidebar from '@/components/_shared/AdminSidebar/AdminSidebar';
import CountriesList from '@/components/admin/countries/CountriesList/CountriesList';

// modals
import ContentEditorModal from '@/components/_shared/ContentEditorModal/ContentEditorModal';
import UpdateCountryModal from '@/components/admin/countries/UpdateCountryModal/UpdateCountryModal';
import DeleteConfirmModal from '@/components/_shared/DeleteConfirmModal/DeleteConfirmModal';

// slices
import { 
    useGetAllCountriesQuery, 
    useCreateCountryMutation, 
    useUpdateCountryMutation,
    useDeleteCountryMutation,
    useLazyGetCountryContentQuery,
    useCreateContentMutation,
    useUpdateContentMutation,
    useDeleteContentMutation
} from '@/store/admin/countries/countries.api';
import { closeUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice'
import { openContentEditorModal, resetContentEditorModal } from '@/store/admin/_shared/slices/contentEditorModalSlice';
import { openDeleteModal, resetDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';
import { resetCountryPageSlice } from '@/store/admin/countries/slices/countriesPageSlice';
import { Form, Input } from 'antd';


const Countries = () => {

  // PREPARE
  const dispatch = useAppDispatch();
  const { data } = useGetAllCountriesQuery();


  // COUNTRY
  // create
  const [createCountry] = useCreateCountryMutation();
  const [nameValue, setNameValue] = useState('');
  const [flagValue, setFlagValue] = useState('');
  const [pathValue, setPathValue] = useState('');

  const [form] = Form.useForm()

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
      form.resetFields();
      setNameValue('');
      setFlagValue('');
      setPathValue('');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить страну');
    }
  };
  
  // update
  const [updateCountry] = useUpdateCountryMutation();
  const { countryToUpdate } = useAppSelector(state => state.countriesPageSlice)
  const { isOpen } = useAppSelector(state => state.updateCountryModalSlice)
  useEffect(() => {
    dispatch(closeUpdateCountry());
    if (!countryToUpdate) return;
    updateCountry(countryToUpdate);
  }, [countryToUpdate])

  // delete
  const [deleteCountry] = useDeleteCountryMutation();
  const { countryToDelete } = useAppSelector(state => state.countriesPageSlice) 
  const { isOpen: isDeleteModalOpen, isDeleteSelected: isDeleteCountrySelected } = useAppSelector(state => state.deleteModalSlice)

  useEffect(() => {
    if (countryToDelete) dispatch(openDeleteModal())
  }, [countryToDelete])

  useEffect(() => {
    if (!countryToDelete?.id) return;
    if (!isDeleteCountrySelected) return;    
    deleteCountry(countryToDelete.id);
    dispatch(resetDeleteModal());
  }, [isDeleteCountrySelected])

  // decline delete
  const { isDeleteDeclined } = useAppSelector(state => state.deleteModalSlice)

  useEffect(() =>{
    dispatch(resetDeleteModal())
    dispatch(resetCountryPageSlice())
  }, [isDeleteDeclined])


  // CONTENT
  const { isOpen: isOpenContentEditorModal, contentToSave, isDeleteConfirm: isDeleteContentSelected, isEditDeclined: isContentEditDeclined } = useAppSelector(state => state.contentEditorModalSlice)
  
  // create/update
  const [createContent] = useCreateContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const { countryToContentEdit } = useAppSelector(state => state.countriesPageSlice) 
  const [getCountryContent, results] = useLazyGetCountryContentQuery();

  useEffect(() => {
    if (!countryToContentEdit) return;
    getCountryContent(countryToContentEdit)
  }, [countryToContentEdit])

  useEffect(() => {
    if (!results.data) return;
    if (results.isFetching) return;
    if (results.data.id === 0) dispatch(openContentEditorModal(results.data));
    else dispatch(openContentEditorModal(results.data));
  }, [results])

  useEffect(() => {
    if (!countryToContentEdit?.id) return;
    if (!contentToSave) return;

    if (!contentToSave.id) createContent({countryId: countryToContentEdit.id, content: contentToSave});
    else updateContent({countryId: countryToContentEdit.id, content: contentToSave});

    dispatch(resetContentEditorModal());
    dispatch(resetCountryPageSlice());
  }, [contentToSave])

  // delete
  const [deleteContent] = useDeleteContentMutation();
  useEffect(() => {
    if (!countryToContentEdit?.id) return;
    if (!isDeleteContentSelected) return;
    deleteContent(countryToContentEdit.id);
    dispatch(resetContentEditorModal());
    dispatch(resetCountryPageSlice());
  }, [isDeleteContentSelected])

  // edit decline
  useEffect(() => {
    dispatch(resetContentEditorModal())
    dispatch(resetCountryPageSlice())
  }, [isContentEditDeclined])


  // design
  const [hamburgerOpened, setHamburgerOpened] = useState(false)
  const hamburgerHandle = () => {
    if (window.innerWidth < 768) setHamburgerOpened(!hamburgerOpened);
  }


  return (
    <>
    <>{ isOpenContentEditorModal && <ContentEditorModal /> }</>
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
        <Form form={form} className={classes.form}>
          <Form.Item name="name" rules={[{ required: true, message: 'Название не может быть пустым' }]}>
            <Input 
              allowClear
              placeholder="Добавьте название страны" 
              value={nameValue} 
              onChange={(e: any) => setNameValue(e.target.value)} 
              className={classes.input}
          />
          </Form.Item>
          <Form.Item name="url" rules={[{ required: true, message: 'URL не может быть пустым' }]}>
            <Input
              allowClear
              placeholder="Добавьте URL флага"
              value={flagValue}
              onChange={(e: any) => setFlagValue(e.target.value)}
              className={classes.input}
            />
          </Form.Item>
          <Form.Item name="path" rules={[{ required: true, message: 'Путь не может быть пустым' }]}>
            <Input
              allowClear 
              placeholder="Добавьте путь флага" 
              value={pathValue} 
              onChange={(e: any) => setPathValue(e.target.value)} 
              className={classes.input}
            />
          </Form.Item>
          <Form.Item>
            <AppButton children="Добавить страну" onClick={addCountryHandle} />
          </Form.Item>
        </Form>
        {
          (data! && data.length!) > 0 ? (
            <CountriesList 
              data={data}
            />
          ) : null
        }
      </div>
    </div>

    </>
  );
};

export default Countries;
