import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true, uniqueItems: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  profile: string;

  @ApiProperty()
  project: number;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
