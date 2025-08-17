import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

const initialState: {
    content: string | null
} = {
    content: null
}

export const notificationSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<string>,) => {
            state.content = action.payload;
        },
        hideNotfication: (state,) => {
            state.content = null;
        }
    }
})

export const { showNotification, hideNotfication } = notificationSlice.actions;
export default notificationSlice.reducer
