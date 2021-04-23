import { combineReducers } from '@reduxjs/toolkit'
import projects from '../components/ProjectsPage/ProjectsPageSlice';
import tasksReducer from './tasksReducer';
import authorization from "./authorizationReducer"
import announcements from '../components/Announcements/AnnouncementsSlice'

const rootReducer = combineReducers({
    projects,
    tasks: tasksReducer,
    authorization,
    announcements
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer