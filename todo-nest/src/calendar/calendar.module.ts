/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import CalendarController from './calendar.controller';
import CalendarService from './calendar.service';

@Module({
    imports: [],
    controllers: [CalendarController],
    providers: [CalendarService],
})

export class CalendarModule {}