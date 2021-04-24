/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const CalendarSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export interface CalendarEvent extends mongoose.Document {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  type: string;
}

export default CalendarEvent;
