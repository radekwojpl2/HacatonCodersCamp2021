/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Action  from './action.model';

import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = '975568697628-0dftutnarlhv79i4rgcd6ojhvgqfe85m.apps.googleusercontent.com';
const CLEINT_SECRET = 'aMB-muybcmhof7TK3RSxb_u4';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04xh8rTocIhFgCgYIARAAGAQSNwF-L9IrN8TY6gd4UZfeDatfJKh7DUFLmJkvLeV79qAOv6QNqEE30YrSODqJley3C3HfCcmxZ8M';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(receiverEmail: string) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'instakaidev@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'CollaborationPlatform <yours authorised email address@gmail.com>',
        to: receiverEmail,
        subject: 'Help requested!',
        html: `<h1>Hello, someone requested a help from you!</h1><p>Please check it out <a href="https://collaboration-platform-hackath.herokuapp.com/employees">here</a></p>`,
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }

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
        sendMail(newActionResult.personToNotify)
        .then((result) => console.log('Email sent...', result))
        .catch((error) => console.log(error.message));
        return newActionResult.id as string;
    }

    async updateAction(actionId: string, title: string, desc: string, date: number, personToNotify: string) {
        try {
            const updatedAction = await this.findAction(actionId);
            if (title) updatedAction.title = title;
            if (desc) updatedAction.desc = desc;
            if (date) updatedAction.date = date;
            if (personToNotify) updatedAction.personToNotify = personToNotify;
            updatedAction.save();
            return updatedAction as Action;
        } catch(err) {
            throw new NotFoundException('Could not find the action');
        }
    }
  

    async deleteAction(actionId: string) {
        try {
            await this.actionModel.deleteOne({ _id: actionId }).exec();
            return { message: "Action successfully deleted"}
        } catch(err) {
            throw new NotFoundException('Could not find the action');
        }
    }
  
    private async findAction(id: string): Promise<Action> {
        let actionFound;
        try {
            actionFound = await this.actionModel.findById(id);
        } catch(err) {
            throw new NotFoundException('Could not find the action');
        }
        if(!actionFound) {
          throw new NotFoundException('Could not find the action');
        }
        return actionFound;
    }
}