import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IContent } from "@/models/IContent";

export interface IContentEditorModalState {
    isOpen: boolean
    contentToEdit: IContent
    contentToSave?: IContent
    isDeleteConfirm: boolean
    isEditDeclined: boolean
}

const initialState: IContentEditorModalState = {
    isOpen: false,
    contentToEdit:
    {
        data: {
        time: 1682271397317, blocks: [
        {
            id: "eq06PsNsab",
            type: "header",
            data: {
                text: "Header",
                level: 1
            }
        },
        {
            id: "mhTl6ghSkV",
            type: "paragraph",
            data: {
                text: "Autor"
            }
        },
        {
            id: "TcUNySG15P",
            type: "paragraph",
            data: {
                text: "Story"
            }
        }
    ]}},
    contentToSave: undefined,
    isDeleteConfirm: false,
    isEditDeclined: false
}

const contentEditorModalSlice = createSlice({
    name: 'contentEditorModal',
    initialState,
    reducers: {
        openContentEditorModal(state, action: PayloadAction<IContent>) {
            state.isOpen = true
            const content = action.payload;
            if (content.id === 0) state.contentToEdit = initialState.contentToEdit
            else state.contentToEdit = content
        },
        closeContentEditorModal(state) {
            state.isOpen = false
        },
        isSaveConfirm(state, action: PayloadAction<IContent>) {
            state.contentToSave = action.payload
            state.isOpen = false
        },
        isDeleteConfirm(state) {
            state.isDeleteConfirm = true
        },
        isDeclineConfirm(state) {
            state.isEditDeclined = true
        },
        resetContentEditorModal() {
            return initialState
        }
    }
})

export const {
    openContentEditorModal, closeContentEditorModal,
    isSaveConfirm, isDeleteConfirm, isDeclineConfirm, resetContentEditorModal } = contentEditorModalSlice.actions

export default contentEditorModalSlice.reducer
