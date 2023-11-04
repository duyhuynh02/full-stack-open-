import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationReducer from '../features/notificationSlice'
import blogsReducer from '../features/blogSlice'

export default combineReducers({
    notification: notificationReducer, 
    blogs: blogsReducer
})
