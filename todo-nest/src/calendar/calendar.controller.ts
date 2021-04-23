/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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