import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailServices {
    constructor(private readonly mailService: MailerService){}

    async sendActivationMail(email: string, link: string) {
        await this.mailService.sendMail({
            from: process.env.EMAIL_FOR_NODEMAILER,
            to: email,
            subject: `How to Send Emails with Nodemailer`,
            text: `Активируйте аккаунт по ссылке ${link}`,
        });
    }
}
