import {
  Controller,
  Param,
  Delete,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAll(@Query() query: PaginationDto) {
    const { page = 1, limit = 10, ...filter } = query;
    return this.userService.findAll(filter, Number(page), Number(limit));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.deleteUser(id);
  }

  // @UseGuards(JWTAuthGuard)
  // @Post('claim-tokens')
  // @HttpCode(HttpStatus.OK)
  // async claimTokens(
  //   @AuthUser() user: UserDocument,
  // ): Promise<{ success: boolean; hash?: string; message?: string }> {
  //   try {
  //     const walletAddress = user?.walletAddress;

  //     // Check if the user has already claimed tokens
  //     if (user?.claimed) {
  //       return {
  //         success: false,
  //         message: 'You have already claimed your tokens.',
  //       };
  //     }

  //     // Check if the wallet address is connected
  //     if (!walletAddress) {
  //       throw new HttpException(
  //         {
  //           success: false,
  //           message: 'Wallet address is not connected.',
  //         },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     // Attempt to claim tokens
  //     // const hash = await this.userService.claimTokens(walletAddress);

  //     // Update user details and save
  //     user.hash = hash;
  //     user.claimed = true;
  //     await user.save();

  //     return {
  //       success: true,
  //       hash,
  //       message: 'Tokens claimed successfully.',
  //     };
  //   } catch (error) {
  //     console.error('Error claiming tokens:', error);

  //     // Handle known errors and provide meaningful feedback
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }

  //     // Generic error response
  //     throw new HttpException(
  //       {
  //         success: false,
  //         message:
  //           'An error occurred while claiming tokens. Please try again later.',
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
