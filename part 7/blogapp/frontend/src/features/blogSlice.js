import { createSlice } from '@reduxjs/toolkit'

export const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlogs: (state, action) => {
            state.push(...action.payload)
        },
        updateBlog: (state, action) => {
            const updatedBlog = action.payload 
            return state.map(blog => blog.id === updatedBlog.id 
                                ? {...updatedBlog, likes: updatedBlog.likes + 1} 
                                : blog)
        }
    }
})

export const { addBlogs, updateBlog } = blogSlice.actions 

export default blogSlice.reducer 

