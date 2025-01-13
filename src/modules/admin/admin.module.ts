import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CommonModule } from '../common/modules/common.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [CommonModule],
  controllers: [AdminController],
  providers: [AdminService, JwtService, UserService],
})
export class AdminModule {}
