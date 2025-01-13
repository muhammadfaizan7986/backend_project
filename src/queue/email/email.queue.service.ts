import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { APP_NAME, EMAIL_TEMPLATE_DIR } from 'src/constants/general.constants';
import {
  EMAIL_OTP_INTERFACE,
  FORGET_PASSWORD_INTERFACE,
} from './email.interface';

@Injectable()
export class EmailQueueService {
  constructor(private readonly mailerService: MailerService) {}

  async otpEmail(data: EMAIL_OTP_INTERFACE): Promise<void> {
    this.mailerService
      .sendMail({
        from: `"${process.env.MAIL_FROM_NAME || 'Fantasy Showdown'}" <${
          process.env.MAIL_FROM_EMAIL || 'no-reply@fantasyshowdown.com'
        }>`,
        to: data.email,
        subject: `${APP_NAME} login code: ${data.otp}`,
        text: `Hi ${data.fullname}, Here is your one time code: ${data.otp}`,
        template: EMAIL_TEMPLATE_DIR + '/OptMessage',
        context: {
          otp: data.otp,
          fullname: `${data.fullname}`,
        },
      })
      .then((success) => {
        console.log('success', success);
      })
      .catch((err) => {
        console.log('mail error', err);
      });
  }

  async passwordResetSuccess(data: FORGET_PASSWORD_INTERFACE): Promise<void> {
    this.mailerService
      .sendMail({
        from: `"${process.env.MAIL_FROM_NAME || 'Fantasy Showdown'}" <${
          process.env.MAIL_FROM_EMAIL || 'no-reply@fantasyshowdown.com'
        }>`,
        to: data.email,
        subject: `${APP_NAME} password reset successfuly`,
        text: `Hi ${data.fullname}, your password has been reset successfuly`,
        template: EMAIL_TEMPLATE_DIR + '/PasswordResetSuccess',
        context: {
          fullname: `${data.fullname}`,
          url: `${process.env.NEXT_APP}/auth/login`,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log('mail error', err);
      });
  }
}
