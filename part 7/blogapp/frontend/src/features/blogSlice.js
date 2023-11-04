import { createSlice } from '@reduxjs/toolkit'

export const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlogs: (state, action) => {
            state.push(...action.payload)
            console.log('state: ', state)
        }
    }
})

export const { addBlogs } = blogSlice.actions 

export default blogSlice.reducer 

