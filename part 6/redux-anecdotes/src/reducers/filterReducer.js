import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    //name này dùng để xác định xem
    name: 'anecdoteFilter', 
    //initial state là cái state ban đầu 
    initialState: '', 
    //còn đây là reducers, createSlice sẽ trả về reducers
    //reducer ở đây là filter
    //filter sẽ có 2 para là state và action 
    //state ở đây là:
    //còn action là cái mình nhập vào 
    reducers: {
        filter(state, action) {
            console.log('action: ', action)
            return action.payload
        }
    }

})
  
export const { filter } = filterSlice.actions 
export default filterSlice.reducer 