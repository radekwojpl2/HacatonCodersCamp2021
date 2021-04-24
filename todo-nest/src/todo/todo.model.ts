/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  value: {
      type: String,
      required: true
  }
});

export interface Todo extends mongoose.Document {
  id: string;
  date: string;
  checked: boolean;
  value: string;
}

export default Todo;
