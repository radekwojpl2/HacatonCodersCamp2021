/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Action  from './action.model';

@Injectable()
export default class ActionsService {
    constructor(
        @InjectModel('Action')
        private readonly actionModel: Model<Action>,
    ) {}

    async getAllActions() {
        const allActions = await this.actionModel.find().exec();
        return allActions.map(action => ({
            id: action.id,
            userId: action.userId,
            title: action.title,
            desc: action.desc,
            date: action.date,
            personToNotify: action.personToNotify
        })) as Action[]
    }
    
        async getSingleAction(actionId: string) {
            const action = await this.findAction(actionId)
            return {
                id: action.id,
                userId: action.userId,
                title: action.title,
                desc: action.desc,
                date: action.date,
                personToNotify: action.personToNotify
            }
        }
    

    async addAction(userId: string, title: string, desc: string, date: number, personToNotify: string) {
        const newAction = new this.actionModel({userId, title, desc, date, personToNotify})
        const newActionResult = await newAction.save();
        return newActionResult.id as string;
    }
  
    private async findAction(id: string): Promise<Action> {
        let actionFound;
        try {
            actionFound = await this.actionModel.findById(id);
        } catch(err) {
            throw new NotFoundException('Could not find the calendarEvent');
        }
        if(!actionFound) {
          throw new NotFoundException('Could not find the calendarEvent');
        }
        return actionFound;
    }
}