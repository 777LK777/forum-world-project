import React, { MouseEventHandler, useState } from 'react';
import { useGesture } from 'react-use-gesture';

import classes from './CountryItem.module.scss';

import { setCountryForDelete, setCountryForUpdate } from '@/store/admin/countries/slices/countriesPageSlice'
import { openDeleteModal } from '../../../../store/admin/countries/slices/deleteConfirmModal'

import { ICountry } from '@/models/ICountry'
import { useAppDispatch, useAppSelector } from '@/pages/hooks/_shared/redux';

import { isDeleteConfirm } from '../../../../store/admin/countries/slices/deleteConfirmModal';

import { openUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice';

interface ICountryItemProps {
  country: ICountry;
  onUpdateCountryStart: MouseEventHandler<HTMLButtonElement>;
  onDeleteCountryFinish: MouseEventHandler<HTMLButtonElement>;
}

const CountryItem: React.FC<ICountryItemProps> = ({ country, onUpdateCountryStart, onDeleteCountryFinish }) => {

  const dispatch = useAppDispatch();

  const [deleteAnimations, setDeleteAnimations] = useState<{ [key: number]: boolean }>({});
  const [updateAnimations, setUpdateAnimations] = useState<{ [key: number]: boolean }>({});

  const handleDelete = () => {
    if (!country?.id) return
    setDeleteAnimations((prevAnimations) => ({ ...prevAnimations, [country.id!]: true }));
    setTimeout(() => {
      dispatch(setCountryForDelete(country))
      dispatch(isDeleteConfirm())
    }, 300); 
  };
  const handleUpdate = () => {
    if (!country?.id) return
    setUpdateAnimations((prevAnimations) => ({ ...prevAnimations, [country.id!]: true }));
    setTimeout(() => {
      dispatch(openUpdateCountry(country))
    }, 300); 
  };

  const deleteAnimation = deleteAnimations[country.id!];
  const updateAnimation = updateAnimations[country.id!];

  const bind = useGesture({
    onDragEnd: (state) => {
      if (state.swipe[0] < 0) {
        handleDelete();
      }
      if (state.swipe[0] > 0) {
        handleUpdate();
      }
    },
  });

  const handleDeleteClick = (country: ICountry) => {
    dispatch(setCountryForDelete(country));
    dispatch(openDeleteModal());
  }

  const handleOnChangeCountryClick = (country: ICountry) => {
    return onUpdateCountryStart
  }

  return (
    <li
      className={`${classes.items} ${deleteAnimation && classes.deleteAnimation}`}
      {...bind()}
    >
      <div className={classes.item}>{country.name}</div>
      <div className={classes.item}>{country.pathFragment}</div>
      <div className={`${classes.item} ${classes.url}`}>
        {country.flagImageUrl.substr(0, 3) + '...' + country.flagImageUrl.substr(-3)}
      </div>
      <div className={classes.flagImg}>
        <img src={`${country.flagImageUrl}`} alt="flag"  height={36} width={70} />
      </div>
      <button onClick={() => handleDeleteClick(country)} className={classes.delete}>
        Удалить
      </button>
      <button onClick={handleOnChangeCountryClick(country)} className={classes.change}>
        Изменить
      </button>
    </li>
  );
};

export default CountryItem;