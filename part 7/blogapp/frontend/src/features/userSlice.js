import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '', 
        password: '',
    },
    reducers: {
        setUsername: (state, action) => {
            return {...state, username: action.payload }
        },
        setPassword: (state, action) => {
            return {...state, password: action.payload }
        }
    }
})

export const { setUsername, setPassword } = userSlice.actions 

export default userSlice.reducer 

