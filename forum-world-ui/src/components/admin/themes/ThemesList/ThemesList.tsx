// outside
import { useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import { useAppDispatch } from '@/hooks/_shared/redux';

// css
import classes from './ThemesList.module.scss';

// ant design
// tooltip
import { Tooltip } from 'antd';
// icons
import {
  DeleteOutlined,
  ToolOutlined
} from '@ant-design/icons';

// models
import { ITheme } from '@/models/ITheme';

// slices
import { setThemeForDelete } from '@/store/admin/themes/slices/themesPageSlice';
import { isDeleteConfirm, openDeleteModal } from '@/store/admin/countries/slices/deleteConfirmModal';
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
              <Tooltip title="Редактировать тему">
                <ToolOutlined />
              </Tooltip>
            </td>
            <td onClick={() => handleDeleteClick(theme)} className={classes.icons}>
              <Tooltip title="Удалить тему">
                <DeleteOutlined />
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ThemesList;
