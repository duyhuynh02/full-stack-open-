import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
    name: 'notification', 
    initialState: 'Hello World!', 
    reducers: {
        noti(state, action) {
            // console.log('action: ', action)
            return action.payload
        }
    }

})
  
export const { noti } = notiSlice.actions 
export default notiSlice.reducer 