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
export default notiSlice.reducer 