/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
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
            }
          },
        },
      })
    async addCalendarEvent(
        @Body('startDate') startDate: string,
        @Body('endDate') endDate: string,
        @Body('title') title: string,
        @Body('type') type: string,
    ) {
        const newId = await this.calendarService.addCalendarEvent(
            startDate,
            endDate,
            title,
            type
        )

        return { id: newId }
    }
}