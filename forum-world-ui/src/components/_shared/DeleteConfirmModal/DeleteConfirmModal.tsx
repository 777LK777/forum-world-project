// outside
import React from 'react';
import { useAppDispatch } from '@/hooks/_shared/redux';

// css
import classes from './DeleteConfirmModal.module.scss';

// slices
import { closeDeleteModal, isDeclineConfirm, isDeleteConfirm } from '@/store/admin/countries/slices/deleteConfirmModal'


interface IDeleteConfirmModalProps {
  message: string;
}

const DeleteConfirmModal: React.FC<IDeleteConfirmModalProps> = ({ message }) => {

  // PREPARE
  const dispatch = useAppDispatch();
  
  // delete
  const handleConfirm = () => {
    dispatch(isDeleteConfirm());
    dispatch(closeDeleteModal());
  };

  // decline
  const handleDecline = () => {
    dispatch(isDeclineConfirm());
    dispatch(closeDeleteModal());
  }


  return (
    (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>{message}</div>
          <div className={classes.modalButtons}>
            <button onClick={handleDecline} className={classes.modalCancelButton}>
              Отмена
            </button>
            <button onClick={handleConfirm} className={classes.modalConfirmButton}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmModal;