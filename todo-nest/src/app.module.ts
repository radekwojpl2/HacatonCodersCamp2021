import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule, CalendarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
