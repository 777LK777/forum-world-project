import React from 'react';

import { useAppDispatch } from '@/pages/hooks/_shared/redux';
import { closeDeleteModal, isDeleteConfirm } from '../../../store/admin/countries/slices/deleteConfirmModal'

import classes from './DeleteConfirmModal.module.scss';

interface IDeleteConfirmModalProps {
  message: string;
}

const DeleteConfirmModal: React.FC<IDeleteConfirmModalProps> = ({ /*onConfirm,*/ message }) => {
  const dispatch = useAppDispatch();
  
  const handleConfirm = () => {
    dispatch(isDeleteConfirm());
    dispatch(closeDeleteModal());
  };


  return (
    (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.modalMessage}>{message}</div>
          <div className={classes.modalButtons}>
            <button onClick={() => dispatch(closeDeleteModal())} className={classes.modalCancelButton}>
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