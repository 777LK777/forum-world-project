// outside
import { useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import { useAppDispatch } from '@/hooks/_shared/redux';

// css
import classes from './CountriesList.module.scss'

// ant design
// tooltip
import { Tooltip } from 'antd';
// icons
import {
  FormOutlined,
  DeleteOutlined,
  ToolOutlined
} from '@ant-design/icons';

// models
import { ICountry } from '@/models/ICountry';

// slices
import { isDeleteConfirm } from '@/store/admin/countries/slices/deleteConfirmModal';
import { openUpdateCountry } from '@/store/admin/countries/slices/updateCountryModalSlice';
import { setCountryForDelete, setCountryToContentEdit } from '@/store/admin/countries/slices/countriesPageSlice';

interface ICountriesListProps {
    data: ICountry[] | undefined;
}

const CountriesList: React.FC<ICountriesListProps> = ( {data} ) => {

  // PREPARE
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
  }

  const handleUpdateClick = (country: ICountry) => {
    dispatch(openUpdateCountry(country))
  }

  const handleOpenContentEditor = (country: ICountry) => {
    dispatch(setCountryToContentEdit(country))
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
            <td onClick={() => handleOpenContentEditor(country)} className={classes.icons}>
              <Tooltip title="Редактировать контент">
                <FormOutlined />
              </Tooltip>
            </td>
            <td onClick={() => handleUpdateClick(country)} className={classes.icons}>
              <Tooltip title="Редактировать страну">
                <ToolOutlined />
              </Tooltip>
            </td>
            <td onClick={() => handleDeleteClick(country)} className={classes.icons}>
              <Tooltip title="Удалить страну">
                <DeleteOutlined />
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CountriesList;
