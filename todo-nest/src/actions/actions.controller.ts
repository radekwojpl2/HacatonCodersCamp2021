/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import ActionsService from './actions.service';

@Controller('actions')
export default class ActionsController {
    constructor(
        private readonly actionsService: ActionsService
    ) {}

    @Get()
    async getAllActions() {
        const allActions = await this.actionsService.getAllActions();
        return allActions;
    }

    @Get(':id')
    getSingleAction(@Param('id') actionId: string) {
        return this.actionsService.getSingleAction(actionId)
    } 

    @Post()
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            userId : {
                type: 'string',
                example: '604a7b12d610101287aa2955'
            },
            title : {
                type: 'string',
                example: 'some action title'
            },
            desc : {
                type: 'string',
                example: 'some action description'
            },
            date : {
                type: 'number',
                example: 1619222686944
            },
            personToNotify: {
                type: "string",
                example: "fsd@gads.com"
            }
          },
        },
      })
    async addAction(
        @Body('userId') userId: string,
        @Body('title') title: string,
        @Body('desc') desc: string,
        @Body('date') date: number,
        @Body('personToNotify') personToNotify: string,
    ) {
        const newId = await this.actionsService.addAction(
            userId,
            title,
            desc,
            date,
            personToNotify
        )

        return { id: newId }
    }

    @Post(':id')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            title : {
                type: 'string',
                example: 'some action title'
            },
            desc : {
                type: 'string',
                example: 'some action description'
            },
            date : {
                type: 'number',
                example: 1619222686944
            },
            personToNotify: {
                type: "string",
                example: "fsd@gads.com"
            }
          },
        },
      })
    UpdateAction(
        @Param('id') actionId: string,
        @Body('title') title: string,
        @Body('desc') desc: string,
        @Body('date') date: number,
        @Body('personToNotify') personToNotify: string,
    ) {
        return this.actionsService.updateAction(actionId, title, desc, date, personToNotify);
    }

    @Delete(':id')
    deleteAction(@Param('id') actionId: string) {
        return this.actionsService.deleteAction(actionId);
    }
}