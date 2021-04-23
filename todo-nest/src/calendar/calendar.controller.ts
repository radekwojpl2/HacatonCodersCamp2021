/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import CalendarService from './calendar.service';

@Controller('calendar')
export default class CalendarController {
    constructor(
        private readonly calendarService: CalendarService
    ) {}

    @Get()
    getHelloMessage() {
    return this.calendarService.getHello();
    }

    @Post()
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