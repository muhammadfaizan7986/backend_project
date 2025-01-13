import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminDto {
  @ApiPropertyOptional({
    description: 'Title of the news article',
    example: 'Enter Email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiPropertyOptional({
    description: 'Title of the news article',
    example: 'Enter Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  walletAddress: string;
}
