/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CalendarController from './calendar.controller';
import CalendarService from './calendar.service';
import { CalendarSchema } from './calendarEvent.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'CalendarEvent', schema: CalendarSchema}])],
    controllers: [CalendarController],
    providers: [CalendarService],
})

export class CalendarModule {}