import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface ICalendarEvent {
    startDate: Date;
    endDate: Date;
    title: string;
    type: string;
    id?: string;
    rRule: string | undefined,
    notes: string | undefined
}

interface ICalendarInitialState {
    events: ICalendarEvent[],
    loading: boolean,
    error: boolean
}

const initialState: ICalendarInitialState = {
    events: [],
    loading: false,
    error: false
}

export const getAllEvents = createAsyncThunk(
    'calendar/getAllEvents',
    async () => {
        try {
            const calendarEvents= await axios.get('https://hackathon-nest.herokuapp.com/calendar').then(res => res.data)
            return calendarEvents
        } catch (err) {
            return err.response.data
        }
    }
)

export const addEvent = createAsyncThunk(
    'calendar/addEvent',
    async (data: ICalendarEvent) => {
        try {
            const newEvent = await axios.post('https://hackathon-nest.herokuapp.com/calendar', data).then(res => res.data)
            console.log(newEvent)
            return newEvent
        } catch (err) {
            return err.response.data
        }
    }
)

export const deleteEvent = createAsyncThunk(
    'calendar/deleteEvent',
    async (id: string | number) => {
        try {
            const deleted = await axios.delete('https://hackathon-nest.herokuapp.com/calendar/'+ id).then(res => res.data)
            
            return deleted
        } catch (err) {
            return err.response.data
        }
    }
)

export const updateEvent = createAsyncThunk(
    'calendar/updateEvent',
    async (data: {[key: string]: any}) => {
        try {
            const key = Object.keys(data)[0]
            const value = Object.values(data)[0]
            const updated = await axios.patch('https://hackathon-nest.herokuapp.com/calendar/'+ key, value).then(res => res.data)

            return updated
        } catch (err) {
            return err.response.data
        }
    }
)

const CalendarViewSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllEvents.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getAllEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getAllEvents.fulfilled, (state, action) => {
            state.events = action.payload;
            state.loading = false;
            state.error = false;
        });
      }
  })

export default CalendarViewSlice.reducer