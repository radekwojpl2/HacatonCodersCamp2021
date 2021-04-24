import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { TodoModule } from './todo/todo.module';
import { ActionsModule } from './actions/actions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ActionsModule,
    TodoModule,
    CalendarModule,
    MongooseModule.forRoot(
      `mongodb+srv://admin:SD7rQLRL5xwGgyS@eduplatform.woboc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
