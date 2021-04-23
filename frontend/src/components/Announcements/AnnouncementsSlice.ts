import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'
import { announcementInterface } from '../../interfaces/Annoucement'

interface AnnouncementsState {
  announcements: announcementInterface[],
  loading: Boolean
}

const initialState: AnnouncementsState = {
    announcements: [],
    loading: false
  }

  export const fetchAnnouncements = createAsyncThunk(
    'announcements/fetchProjects',
    async () => {
        try {
            return await axios.get('/announcements').then(res => res.data)
    }
    catch(err){
        console.log("ERROR")}}
)

const AnnouncementsSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {},
    extraReducers: {
        [`${fetchAnnouncements.pending}`]: (state) => {
            state.loading = true
          },
        [`${fetchAnnouncements.fulfilled}`]: (state, action) => {
          state.announcements = action.payload
          state.loading = false
        },

      }
  })

  export default AnnouncementsSlice.reducer