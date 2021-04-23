/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import TodoService from './todo.service';

@Controller('todo')
export default class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Get()
    async getAllTodo() {
        const allTodo = await this.todoService.getAllTodo();
        return allTodo;
    }

    @Get(':id')
    getSingleTodo(@Param('id') todoId: string) {
        return this.todoService.getSingleTodo(todoId)
    } 

    @Post()
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            date : {
                type: 'string',
                example: '2020-04-04'
            },
            checked : {
                type: 'boolean',
                example: false
            },
            value : {
                type: 'string',
                example: '分かりません' 
            }
          },
        },
      })
    async addTodo(
        @Body('date') date: string,
        @Body('checked') checked: boolean,
        @Body('value') value: string,
    ) {
        const newId = await this.todoService.addTodo(
            date,
            checked,
            value,
        )

        return { id: newId }
    }
}