/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CalendarEvent from './calendarEvent.model'

@Injectable()
export default class CalendarService {
  constructor(
    @InjectModel('CalendarEvent')
    private readonly calendarEvent: Model<CalendarEvent>,
  ) {}

  async addCalendarEvent(startDate: string, endDate: string, title: string, type: string) {
      const newCalendarEvent = new this.calendarEvent({startDate, endDate, title, type})
      const newCalendarEventResult = await newCalendarEvent.save();
      return newCalendarEventResult.id as string;
  }

  async getCalendarEvents() {
      const calendarEvents = await this.calendarEvent.find().exec();
      return calendarEvents.map(event => ({
          id: event.id,
          startDate: event.startDate,
          endDate: event.endDate,
          title: event.title,
          type: event.type
      })) as CalendarEvent[]
  }
}