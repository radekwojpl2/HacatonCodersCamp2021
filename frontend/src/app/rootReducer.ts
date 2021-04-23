import { combineReducers } from '@reduxjs/toolkit'
import projects from '../components/ProjectsPage/ProjectsPageSlice';
import tasksReducer from './tasksReducer';
import authorization from "./authorizationReducer"
import announcements from '../components/Announcements/AnnouncementsSlice'
import calendar from '../components/Calendar/CalendarViewSlice'

const rootReducer = combineReducers({
    projects,
    tasks: tasksReducer,
    authorization,
    announcements,
    calendar
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer