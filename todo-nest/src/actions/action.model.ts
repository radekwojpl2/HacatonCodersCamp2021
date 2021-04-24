/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ActionSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  title: {
      type: String,
      required: true
  },
  desc: {
      type: String,
      required: true
  },
  date: {
      type: Number,
      required: true
  },
  personToNotify: {
      type: String,
      required: true
  }
});

export interface Action extends mongoose.Document {
  id: string;  
  userId: string;
  title: string;
  desc: string;
  date: number;
  personToNotify: string;
}

export default Action;
