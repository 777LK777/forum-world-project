import { useRef } from 'react';
import classes from './CountriesList.module.scss'
import Image from 'next/image';

import { useAppDispatch } from '../../../../pages/hooks/_shared/redux';
import { ICountry } from '../../../../models/ICountry';
import { setCountryForDelete } from '../../../../store/admin/countries/slices/countriesPageSlice';
import { isDeleteConfirm, openDeleteModal } from '../../../../store/admin/countries/slices/deleteConfirmModal';
import { openUpdateCountry } from '../../../../store/admin/countries/slices/updateCountryModalSlice';
import { useGesture } from 'react-use-gesture';

interface ICountriesListProps {
    data: ICountry[] | undefined;
}

const CountriesList: React.FC<ICountriesListProps> = ( {data} ) => {
    
    const dispatch = useAppDispatch(); 

    const currentCountryRef = useRef<ICountry>();

    const bind = useGesture({
      onDragEnd: (state) => {
        const targetElement = state.event.target as HTMLElement | null;
        if (targetElement && targetElement.tagName === 'TD') {
            const tdId = (targetElement as HTMLElement).id;
            currentCountryRef.current = data?.find(obj => obj.id === +tdId);
        }      
        if (state.swipe[0] < 0 && currentCountryRef.current) {
          if (!currentCountryRef.current?.id) return;
          setTimeout(() => {
            if (!currentCountryRef?.current) return
            dispatch(setCountryForDelete(currentCountryRef?.current));
            dispatch(isDeleteConfirm())
          }, 300);
        }
        if (state.swipe[0] > 0 && currentCountryRef.current) {
          if (!currentCountryRef.current?.id) return;
          setTimeout(() => {
            if (!currentCountryRef?.current) return
            dispatch(openUpdateCountry(currentCountryRef?.current));
          }, 300);
        }
      }
    })

    const handleDeleteClick = (country: ICountry) => {
      dispatch(setCountryForDelete(country))
      dispatch(openDeleteModal())
    }

    const handleUpdateClick = (country: ICountry) => {
      dispatch(openUpdateCountry(country))
    }

    return (
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Тема</th>
            <th className={classes.th}>Путь</th>
            <th className={`${classes.th} ${classes.urlTitle}`}>URL флага</th>
            <th className={classes.th}>Флаг</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((country, index) => (
            <tr 
              id={`${country.id}`}
              className={`${classes.tr}`} 
              key={country.id} 
              style={{ backgroundColor: index % 2 === 0 ? '#e6e6e6' : 'white' }}
              {...bind()}
            >
              <td id={`${country.id}`} className={classes.td}>{country.name}</td>
              <td id={`${country.id}`} className={classes.td}>{country.pathFragment}</td>
              <td id={`${country.id}`} className={`${classes.td} ${classes.url}`}>{country.flagImageUrl}</td>
              <td id={`${country.id}`} className={`${classes.td} ${classes.flag}`}>
                <img
                  src={country.flagImageUrl}
                  alt='flag'
                  width={70}
                />
              </td>
              <td onClick={() => handleUpdateClick(country)} className={classes.icons}>
               <Image
                  src="/images/editIcon.png"
                  alt='edit'
                  width={30}
                  height={30}
                />
              </td>
              <td onClick={() => handleDeleteClick(country)} className={classes.icons}>
                <Image
                  src="/images/deleteIcon.png"
                  alt='delete'
                  width={30}
                  height={30}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default CountriesList;