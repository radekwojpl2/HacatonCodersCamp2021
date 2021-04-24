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
  rRule: {
    type: String,
  },
  notes: {
    type: String
  }
});

export interface CalendarEvent extends mongoose.Document {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  type: string;
  rRule: string | undefined;
  notes: string | undefined;
}

export default CalendarEvent;
