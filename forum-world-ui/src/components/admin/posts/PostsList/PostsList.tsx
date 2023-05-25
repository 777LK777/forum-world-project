// outside
import { useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import { useAppDispatch } from '@/hooks/_shared/redux';

// css
import classes from './PostsList.module.scss';

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
import { IPost } from "@/models/IPost";

// slices
import { isDeleteConfirm, openDeleteModal } from "@/store/admin/countries/slices/deleteConfirmModal";
import { setPostForDelete, setPostToContentEdit } from "@/store/admin/posts/slices/postsPageSlice";
import { openUpdatePost } from "@/store/admin/posts/slices/updatePostModalSlice";

interface IPostsListProps {
    data: IPost[] | undefined;
}

const PostsList: React.FC<IPostsListProps> = ( { data } ) => {
    
    // PREPARE
    const dispatch = useAppDispatch();
    const currentPostRef = useRef<IPost>();

    // Touch
    const bind = useGesture({
        onDragEnd: (state) => {
          const targetElement = state.event.target as HTMLElement | null;
          if (targetElement && targetElement.tagName === 'TD') {
              const tdId = (targetElement as HTMLElement).id;
              currentPostRef.current = data?.find(obj => obj.id === +tdId);
          }      
          if (state.swipe[0] < 0 && currentPostRef.current) {
            if (!currentPostRef.current?.id) return;
            setTimeout(() => {
              if (!currentPostRef?.current) return;
              dispatch(setPostForDelete(currentPostRef?.current));
              dispatch(isDeleteConfirm());
            }, 300);
          }
          if (state.swipe[0] > 0 && currentPostRef.current) {
            if (!currentPostRef.current?.id) return;
            setTimeout(() => {
              if (!currentPostRef?.current) return
              dispatch(openUpdatePost(currentPostRef?.current));
            }, 300);
          }
        }
    })

    // handlers
    const handleDeleteClick = (post: IPost) => {
        dispatch(setPostForDelete(post))
        dispatch(openDeleteModal())
    }

    const handleUpdateClick = (post: IPost) => {
        dispatch(openUpdatePost(post));
    }

    const handleOpenContentEditor = (post: IPost) => {
      dispatch(setPostToContentEdit(post))
    }    

    return (
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Пост</th>
            <th className={classes.th}>Страна</th>
            <th className={classes.th}>Тема</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post, index) => (
            <tr 
              id={`${post.id}`}
              className={`${classes.tr}`} 
              key={post.id} 
              style={{ backgroundColor: index % 2 === 0 ? '#e6e6e6' : 'white' }}
              {...bind()}
            >
              <td id={`${post.id}`} className={classes.td}>{post.name}</td>
              <td id={`${post.id}`} className={classes.td}>{post.country.name}</td>
              <td id={`${post.id}`} className={classes.td}>
                { post.theme ?
                  post.theme.name :
                  <b>Пост без темы</b>
                }
              </td>
              <td onClick={() => handleOpenContentEditor(post)} className={classes.icons}>
                <Tooltip title="Редактировать контент">
                  <FormOutlined/>
                </Tooltip>
              </td>
              <td onClick={() => handleUpdateClick(post)} className={classes.icons}>
                <Tooltip title="Редактировать пост">
                  <ToolOutlined />
                </Tooltip>
              </td>
              <td onClick={() => handleDeleteClick(post)} className={classes.icons}>
                <Tooltip title="Удалить пост">
                  <DeleteOutlined />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default PostsList;