import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from '../common/modules/common.module';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [CommonModule, AdminModule],
  controllers: [UserController],
  providers: [UserService, AdminService, JwtService],
  exports: [UserService, AdminService, JwtService],
})
export class UserModule {}
