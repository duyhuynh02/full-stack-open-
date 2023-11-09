import { createSlice } from '@reduxjs/toolkit'

export const allUsersSlice = createSlice({
    name: 'AllUser',
    initialState: [],
    reducers: {
        getAllUsers: (state, action) => {
            return [...state, action.payload]
        }
    }
})

export const { getAllUsers } = allUsersSlice.actions 

export default allUsersSlice.reducer 

