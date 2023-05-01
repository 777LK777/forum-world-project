import { useRef } from 'react';
import Image from 'next/image';
import classes from './ThemesList.module.scss';
import { useAppDispatch } from '@/pages/hooks/_shared/redux';
import { setThemeForDelete } from '@/store/admin/themes/slices/themesPageSlice';
import { isDeleteConfirm, openDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';
import { ITheme } from '@/models/ITheme';
import { useGesture } from 'react-use-gesture';
import { openUpdateTheme } from '@/store/admin/themes/slices/updateThemeModalSlice';

interface IThemesListProps {
  data: ITheme[] | undefined;
}

const ThemesList: React.FC<IThemesListProps> = ( { data } ) => {

  const dispatch = useAppDispatch();

  const currentThemeRef = useRef<ITheme>();
 
  const bind = useGesture({
    onDragEnd: (state) => {
      const targetElement = state.event.target as HTMLElement | null;
      if (targetElement && targetElement.tagName === 'TD') {
          const tdId = (targetElement as HTMLElement).id;
          currentThemeRef.current = data?.find(obj => obj.id === +tdId);
      }      
      if (state.swipe[0] < 0 && currentThemeRef.current) {
        if (!currentThemeRef.current?.id) return;
        setTimeout(() => {
          if (!currentThemeRef?.current) return;
          dispatch(setThemeForDelete(currentThemeRef?.current));
          dispatch(isDeleteConfirm())
        }, 300);
      }
      if (state.swipe[0] > 0 && currentThemeRef.current) {
        if (!currentThemeRef.current?.id) return;
        setTimeout(() => {
          if (!currentThemeRef?.current) return
          dispatch(openUpdateTheme(currentThemeRef?.current));
        }, 300);
      }
    }
  })

  const handleDeleteClick = (theme: ITheme) => {
    dispatch(setThemeForDelete(theme))
    dispatch(openDeleteModal())
  }  

  const handleUpdateClick = (theme: ITheme) => {
    dispatch(openUpdateTheme(theme));
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.tr}>
          <th className={classes.th}>Тема</th>
          <th className={classes.th}>Путь</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((theme, index) => (
          <tr 
            id={`${theme.id}`}
            className={`${classes.tr}`} 
            key={theme.id} 
            style={{ backgroundColor: index % 2 === 0 ? '#e6e6e6' : 'white' }}
            {...bind()}
          >
            <td id={`${theme.id}`} className={classes.td}>{theme.name}</td>
            <td id={`${theme.id}`} className={classes.td}>{theme.pathFragment}</td>
            <td onClick={() => handleUpdateClick(theme)} className={classes.icons}>
             <Image
                src="/images/editIcon.png"
                alt='edit'
                width={30}
                height={30}
              />
            </td>
            <td onClick={() => handleDeleteClick(theme)} className={classes.icons}>
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
  );
}

export default ThemesList;
