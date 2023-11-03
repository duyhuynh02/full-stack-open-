import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        value: ''
    },
    reducers: {
        setNotification: (state, message) => {
            state.value = message.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions 

export default notificationSlice.reducer 

