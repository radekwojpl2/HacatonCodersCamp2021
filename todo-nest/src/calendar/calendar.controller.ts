/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import CalendarService from './calendar.service';

@Controller('calendar')
export default class CalendarController {
    constructor(
        private readonly calendarService: CalendarService
    ) {}

    @Get()
    async getAllCalendarEvents() {
        const allCalendarEvents = await this.calendarService.getCalendarEvents();
        return allCalendarEvents;
    }

    @Get(':id')
    getSingleProduct(@Param('id') calendarEventId: string) {
        return this.calendarService.getSingleCalendarEvent(calendarEventId)
    } 

    @Post()
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            startDate : {
                type: 'string',
                example: '2020-04-04'
            },
            endDate : {
                type: 'string',
                example: '2020-04-05'
            },
            title : {
                type: 'string',
                example: 'some title'
            },
            type : {
                type: 'string',
                example: 'normal'
            },
            rRule: {
                type: 'string',
                example: ''
            },
            notes: {
                type: 'string',
                example: ''
            }
          },
        },
      })
    async addCalendarEvent(
        @Body('startDate') startDate: string,
        @Body('endDate') endDate: string,
        @Body('title') title: string,
        @Body('type') type: string,
        @Body('rRule') rRule: string,
        @Body('notes') notes: string,
    ) {
        const newId = await this.calendarService.addCalendarEvent(
            startDate,
            endDate,
            title,
            type,
            rRule,
            notes
        )

        return { id: newId }
    }

    @Patch(':id')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            startDate : {
                type: 'string',
                example: '2020-04-04'
            },
            endDate : {
                type: 'string',
                example: '2020-04-05'
            },
            title : {
                type: 'string',
                example: 'some title'
            },
            type : {
                type: 'string',
                example: 'normal'
            },
            rRule: {
                type: 'string',
                example: ''
            },
            notes: {
                type: 'string',
                example: ''
            }
          },
        },
      })
    updateCalendarEvent(
        @Param('id') calendarEventId: string,
        @Body('startDate') startDate: string,
        @Body('endDate') endDate: string,
        @Body('title') title: string,
        @Body('type') type: string ,
        @Body('rRule') rRule: string,
        @Body('notes') notes: string,
    ) {
        return this.calendarService.updateCalendarEvent(calendarEventId, startDate, endDate, title, type, rRule, notes);
    }

    @Delete(':id')
    deleteCalendarEvent(@Param('id') calendarEventId: string) {
        return this.calendarService.deleteCalendarEvent(calendarEventId);
    }
}