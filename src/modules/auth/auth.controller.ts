// auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  // Query,
  // Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/create-auth.dto';
import { SignOutResult } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/decorators/user.decorator';
import { UserDocument } from '../user/entities/user.entity';
import { JWTAuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { SendPasswordResetDto } from './dto/sendPasswordReset.dto';

// import { YahooProfile } from './strategies/yahoo.strategy';

@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JWTAuthGuard, RolesGuard)
  // @Roles('admin') // Only accessible to users with the 'admin' role
  // @Get('admin')
  // getAdminData() {
  //   return 'This route is restricted to admins!';
  // }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiBody({
    description: 'User signup data',
    type: SignInInput,
  })
  async signup(@Body() body: SignInInput): Promise<SignOutResult> {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    description: 'User signup data',
    type: LoginDto,
  })
  async login(@Body() body: LoginDto): Promise<SignOutResult> {
    return this.authService.login(body);
  }

  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getProfile(@AuthUser() user: UserDocument) {
    if (!user) {
      return null;
    }
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-password-reset')
  @ApiBody({
    description: 'User email',
    type: SendPasswordResetDto,
  })
  async sendPasswordReset(@Body('email') email: string) {
    return await this.authService.sendPasswordResetEmail(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('re-send-code')
  @ApiBody({
    description: 'User email',
    type: SendPasswordResetDto,
  })
  async resendVerificationEmail(@Body('email') email: string) {
    return await this.authService.resendVerificationEmail(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  @ApiBody({
    description: 'Reset password data',
    type: ResetPasswordDto,
  })
  async resetPassword(
    @Body()
    body: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(body);
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('email-verification')
  // async verificationEmail(@Body('email') email: string) {
  //   return await this.authService.verificationEmail({ email });
  // }

  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  @ApiBody({
    description: 'User email and OTP',
    type: VerifyEmailDto,
  })
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return await this.authService.verifyEmail(body);
  }
}
