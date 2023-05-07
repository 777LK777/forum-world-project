// outside
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { OutputData } from '@editorjs/editorjs';
import { useAppDispatch, useAppSelector } from '@/hooks/_shared/redux';

// css
import classes from './ContentEditorModal.module.scss'

//slices
import { isSaveConfirm, isDeleteConfirm, closeContentEditorModal, isDeclineConfirm } from '@/store/admin/_shared/slices/contentEditorModalSlice';


let Editor: any = undefined
if (typeof window !== undefined) {
    Editor = dynamic(() => import('../ContentEditor/ContentEditor'), {ssr: false})
}

const ContentEditorModal: React.FC = () => {
    
    // PREPARE
    const dispatch = useAppDispatch();


    // save
    const { contentToEdit: data } = useAppSelector(state => state.contentEditorModalSlice)
    const [currentContent, setCurrentContent] = useState<OutputData>(data.data)
    
    const handleContentChange = (cont: OutputData) => {
        setCurrentContent(cont)
    }

    const handleSaveConfirm = () => {
        dispatch(isSaveConfirm({ id: data.id, data: currentContent }))
        dispatch(closeContentEditorModal())
    }

    // delete
    const handleDeleteConfirm = () => {
        dispatch(isDeleteConfirm())
        dispatch(closeContentEditorModal())
    }

    // decline
    const handleDeclineConfirm = () => {
        dispatch(isDeclineConfirm())
        dispatch(closeContentEditorModal())
    }
    

    return (
        (
            <div className={classes.modalBackdrop}>
            <div className={classes.modal}>
            <div className={classes.modalContent}>
                <Editor content={data.data} onChange={handleContentChange}/>
            </div>

                <div className={classes.modalButtons}>
                <button onClick={handleDeclineConfirm} className={classes.modalCancelButton}>
                    Отмена
                </button>
                <button onClick={handleDeleteConfirm} className={classes.modalConfirmButton}>
                    Удалить
                </button>
                <button onClick={handleSaveConfirm} className={classes.modalSaveButton}>
                    Сохранить
                </button>
            </div>
            </div>
            </div>
        )
    );
};

export default ContentEditorModal;