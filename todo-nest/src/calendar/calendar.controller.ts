/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
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
}