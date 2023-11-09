import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationReducer from '../features/notificationSlice'
import blogsReducer from '../features/blogSlice'
import userReducer from '../features/userSlice'
import usersReducer from '../features/allUsersSlice'

export default combineReducers({
    notification: notificationReducer, 
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
})
