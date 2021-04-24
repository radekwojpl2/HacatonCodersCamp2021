/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ActionsController from './actions.controller';
import ActionsService from './actions.service';
import { ActionSchema } from './action.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Action', schema: ActionSchema}])],
    controllers: [ActionsController],
    providers: [ActionsService],
})

export class ActionsModule {}