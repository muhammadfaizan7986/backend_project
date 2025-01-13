import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verifications')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createCode(
    @Body('code') code: number,
    @Body('userId') userId,
    @Body('type') type?: string,
  ) {
    return this.verificationService.createCode(code, userId, type);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async findByUserId(@Param('userId') userId: string) {
    return this.verificationService.findByUserId(userId);
  }

  @Post('find')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() query: any) {
    return this.verificationService.findOne(query);
  }

  @Post('create-verification')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: any) {
    return this.verificationService.create(data);
  }
}
