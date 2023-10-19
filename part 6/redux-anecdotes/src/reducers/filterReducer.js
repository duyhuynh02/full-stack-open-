import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'anecdoteFilter', 
    initialState: '', 
    reducers: {
        filter(state, action) {
            // console.log('action: ', action)
            return action.payload
        }
    }

})
  
export const { filter } = filterSlice.actions 
export default filterSlice.reducer 