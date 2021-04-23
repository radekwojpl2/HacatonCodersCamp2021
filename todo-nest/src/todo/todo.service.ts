/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Todo from './todo.model';

@Injectable()
export default class TodoService {
    constructor(
        @InjectModel('Todo')
        private readonly todoModel: Model<Todo>,
    ) {}

  async getAllTodo() {
    const allTodo = await this.todoModel.find().exec();
    return allTodo.map(todo => ({
        id: todo.id,
        date: todo.date,
        checked: todo.checked,
        value: todo.value,
    })) as Todo[]
}

    async getSingleTodo(TodoId: string) {
        const singleTodo = await this.findTodo(TodoId)
        return {
            id: singleTodo.id,
            date: singleTodo.date,
            checked: singleTodo.checked,
            value: singleTodo.value,
        }
    }

    async addTodo(date: string, checked: boolean, value: string) {
        const newTodo = new this.todoModel({date, checked ,value});
        const newTodoResult = await newTodo.save();
        return newTodoResult.id as string;
    }

    async updateTodo(todoId: string, date: string, checked: boolean, value: string) {
        try {
            const updatedTodo = await this.findTodo(todoId);
            if (date) updatedTodo.date = date;
            if (checked) updatedTodo.checked = checked;
            if (value) updatedTodo.value = value;
            updatedTodo.save();
            return updatedTodo as Todo;
        } catch(err) {
            throw new NotFoundException('Could not find the todo');
        }
    }

    async deleteTodo(todoId: string) {
        try {
            await this.todoModel.deleteOne({ _id: todoId }).exec();
            return { message: "Todo successfully deleted"}
        } catch(err) {
            throw new NotFoundException('Could not find the todo');
        }
    }

    private async findTodo(id: string): Promise<Todo> {
        let todoToFound;
        try {
            todoToFound = await this.todoModel.findById(id);
        } catch(err) {
            throw new NotFoundException('Could not find the calendarEvent');
        }
        if(!todoToFound) {
          throw new NotFoundException('Could not find the calendarEvent');
        }
        return todoToFound;
    }
}