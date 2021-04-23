import { Injectable } from '@nestjs/common';

@Injectable()
export default class TodoService {
    getHello() {
        return "Hello";
    }
}