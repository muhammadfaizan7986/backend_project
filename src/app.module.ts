// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/modules/common.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AdminModule } from './modules/admin/admin.module';
import { VerificationModule } from './modules/verification/verification.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { QUEUE_EMAIL_SERVICE } from './constants/queue.constants';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV || 'production'}`
        : '.env',
      cache: true,
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    AuthModule,
    UserModule,
    AdminModule,
    VerificationModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_URL,
        port: process.env.MAIL_PORT,
        secure:
          process.env.MAIL_SECURE && process.env.MAIL_SECURE == 'yes'
            ? true
            : false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `'${process.env.MAIL_FROM_NAME}' <${process.env.MAIL_FROM_EMAIL}>`,
      },
      template: {
        dir: process.cwd() + '/static/email-templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URL || 'localhost', // Replace with your Redis host
        port: parseInt(process.env.REDIS_PORT) || 6379, // Replace with your Redis port
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_EMAIL_SERVICE,
    }),
    // ScoreModule,
    // ReportModule,
    // DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: YahooGuard, // Optional: Global guard for JWT authentication
    // },
  ],
})
export class AppModule {}
