import { Injectable } from '@nestjs/common';

@Injectable()
export default class CalendarService {
    getHello() {
        return "Hello calendar";
    }
}