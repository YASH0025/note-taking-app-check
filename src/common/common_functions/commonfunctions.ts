import { Injectable } from "@nestjs/common"
import * as ejs from 'ejs'
import * as fs from 'fs'
import { MailerService } from '@nestjs-modules/mailer'
@Injectable()
export class CommonFunctions {

    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async checkIfTimeExpired(time: any) {
        const currentEpochTimestamp = await Date.now()
        const fiveMinutesAgoTimestamp = await currentEpochTimestamp - 15 * 60 * 1000
        const isOtpExpired = await time < fiveMinutesAgoTimestamp
        return isOtpExpired
    }

    //This function check if token is expire or not
    async tokenExpiryCheck(value: any) {
        const currentTimestamp = Math.floor(Date.now() / 1000)
        return value > currentTimestamp
    }


    //This function renders ejs file for dynamic templates and data in it
    async renderWithData(data: Record<string, any>, path: any) {
        const template = await fs.readFileSync(path, 'utf-8');
        const rendered = await ejs.render(template, data);
        return rendered;
    }


    async sendEmail(data: any) {
        return await this.mailerService
            .sendMail({
                to: data.to,
                from: process.env.HOST_USER,
                subject: data.subject,
                html: data.html
            })
    }

    async trimedValues(data: any) {
        let trimmedObject = ''
        let regex = /\s+/
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = data[key]
                if (typeof value === "string"&& regex.test(value)) {
                    if (key === 'fullName') {
                        trimmedObject = `Invalid ${key}` 
                    } else {
                        trimmedObject = `Invalid ${key}`
                    }
                }
            }
        }

        return trimmedObject;
    }
}