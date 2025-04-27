import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailServices } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_FOR_NODEMAILER,
          pass: process.env.PASSWORD_FOR_NODEMAILER,
        },
      },
    })
  ],
  providers: [MailServices],
  exports: [MailServices]
})
export class MailModule {}
