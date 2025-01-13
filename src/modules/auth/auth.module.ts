// auth.module.ts
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
import { CommonModule } from '../common/modules/common.module';
import { AdminService } from '../admin/admin.service';
import { VerificationModule } from '../verification/verification.module';
import { VerificationService } from '../verification/verification.service';
import { PassportModule } from '@nestjs/passport';
import { EmailQueueModule } from 'src/queue/email/email.queue.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    CommonModule,
    EmailQueueModule,
    JwtModule.register({
      signOptions: { expiresIn: jwtConstants.expire },
      secret: jwtConstants.secret,
      verifyOptions: {
        algorithms: ['HS256'],
      },
    }),
    VerificationModule,
    PassportModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    JwtService,
    AdminService,
    VerificationService,
  ],
  exports: [AuthService, JwtService, UserService, AdminService],
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(
  //       session({
  //         secret: jwtConstants.secret,
  //         resave: false,
  //         saveUninitialized: false,
  //         cookie: { secure: process.env.NODE_ENV === 'development' },
  //       }),
  //     )
  //     .forRoutes('*');
  // }
}
