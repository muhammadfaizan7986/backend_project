import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { JwtService } from '@nestjs/jwt';
import { CommonModule } from '../common/modules/common.module';

@Module({
  imports: [CommonModule],
  controllers: [VerificationController],
  providers: [VerificationService, JwtService],
})
export class VerificationModule {}
