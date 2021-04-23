/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import TodoService from './todo.service';

@Controller('todo')
export default class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Get()
    getHelloMessage() {
    return this.todoService.getHello();
    }
}