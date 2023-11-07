import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationReducer from '../features/notificationSlice'
import blogsReducer from '../features/blogSlice'
import userReducer from '../features/userSlice'

export default combineReducers({
    notification: notificationReducer, 
    blogs: blogsReducer,
    user: userReducer
})
