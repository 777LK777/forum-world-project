// outside
import { useAppDispatch } from "@/hooks/_shared/redux";
import React, { useRef } from "react";
import { useGesture } from 'react-use-gesture';

// css
import classes from './PagesList.module.scss';

// ant design
// tooltip
import { Tooltip } from 'antd';
// icons
import {
  DeleteOutlined,
  FormOutlined,
  ToolOutlined
} from '@ant-design/icons';

// models
import { IPage } from "@/models/IPage";

// slices
import { openDeleteModal, isDeleteConfirm } from "@/store/admin/countries/slices/deleteConfirmModal";
import { setPageForDelete, setPageToContentEdit } from "@/store/admin/pages/slices/pagesPageSlice";
import { openUpdatePage } from "@/store/admin/pages/slices/updatePageModalSlice";

interface IPagesListProps {
    data: IPage[] | undefined
}

const PagesList: React.FC<IPagesListProps> = ( { data } ) => {

    // PREPARE
    const dispatch = useAppDispatch();
    const currentPageRef = useRef<IPage>();

    // Touch
    const bind = useGesture({
        onDragEnd: (state) => {
          const targetElement = state.event.target as HTMLElement | null;
          if (targetElement && targetElement.tagName === 'TD') {
              const tdId = (targetElement as HTMLElement).id;
              currentPageRef.current = data?.find(obj => obj.id === +tdId);
          }      
          if (state.swipe[0] < 0 && currentPageRef.current) {
            if (!currentPageRef.current?.id) return;
            setTimeout(() => {
              if (!currentPageRef?.current) return;
              dispatch(setPageForDelete(currentPageRef?.current));
              dispatch(isDeleteConfirm());
            }, 300);
          }
          if (state.swipe[0] > 0 && currentPageRef.current) {
            if (!currentPageRef.current?.id) return;
            setTimeout(() => {
              if (!currentPageRef?.current) return
              dispatch(openUpdatePage(currentPageRef?.current));
            }, 300);
          }
        }
    })

    // handlers
    const handleDeleteClick = (page: IPage) => {
        dispatch(setPageForDelete(page))
        dispatch(openDeleteModal())
    }

    const handleUpdateClick = (page: IPage) => {
        dispatch(openUpdatePage(page))
    }

    const handleOpenContentEditor = (page: IPage) => {
        dispatch(setPageToContentEdit(page))
    }

    return (
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Страница</th>
            <th className={classes.th}>Путь страницы</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((page, index) => (
            <tr 
              id={`${page.id}`}
              className={`${classes.tr}`} 
              key={page.id} 
              style={{ backgroundColor: index % 2 === 0 ? '#e6e6e6' : 'white' }}
              {...bind()}
            >
              <td id={`${page.id}`} className={classes.td}>{page.name}</td>
              <td id={`${page.id}`} className={classes.td}>{page.pathFragment}</td>
              <td onClick={() => handleOpenContentEditor(page)} className={classes.icons}>
                <Tooltip title="Редактировать контент">
                  <FormOutlined/>
                </Tooltip>
              </td>
              <td onClick={() => handleUpdateClick(page)} className={classes.icons}>
                <Tooltip title="Редактировать страницу">
                  <ToolOutlined />
                </Tooltip>
              </td>
              <td onClick={() => handleDeleteClick(page)} className={classes.icons}>
                <Tooltip title="Удалить страницу">
                  <DeleteOutlined />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    )
}

export default PagesList;