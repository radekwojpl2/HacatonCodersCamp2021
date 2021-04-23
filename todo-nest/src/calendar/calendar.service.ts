/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getSingleCalendarEvent(calendarEventId: string) {
      const singleCalendarEvent = await this.findCalendarEvent(calendarEventId)
      return {
          id: singleCalendarEvent.id,
          startDate: singleCalendarEvent.startDate,
          endDate: singleCalendarEvent.endDate,
          title: singleCalendarEvent.title,
          type: singleCalendarEvent.type
      }
  }

  async deleteCalendarEvent(calendarEventId: string) {
      try {
          await this.calendarEvent.deleteOne({ _id: calendarEventId }).exec();
          return { message: "Calendar event successfully deleted"}
      } catch(err) {
          throw new NotFoundException('Could not find the calendar event');
      }
  }

  private async findCalendarEvent(id: string): Promise<CalendarEvent> {
      let calendarEventToFound;
      try {
          calendarEventToFound = await this.calendarEvent.findById(id);
      } catch(err) {
          throw new NotFoundException('Could not find the calendarEvent');
      }
      if(!calendarEventToFound) {
        throw new NotFoundException('Could not find the calendarEvent');
      }
      return calendarEventToFound;
  }
}