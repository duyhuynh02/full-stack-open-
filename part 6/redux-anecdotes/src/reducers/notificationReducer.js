import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
    name: 'notification', 
    initialState: 'Hello World!', 
    reducers: {
        noti(state, action) {
            return action.payload
        }, 
        clearNoti(state, action) {
            action.payload = ''
            return action.payload
        }
    }

})
  
export const { noti, clearNoti } = notiSlice.actions 

export const setNotification = (content) => {
    return (dispatch) => {
        dispatch(noti(`you created a new blog "${content}"`))
        setTimeout(() => { dispatch(clearNoti()) }, 5000)
    }
}

export default notiSlice.reducer 