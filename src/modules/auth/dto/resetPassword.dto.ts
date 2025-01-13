import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email address associated with the account',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Verification code sent to the user's email",
    example: '123456',
  })
  @IsString()
  code: string;

  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!$%^&()_+|~=`{}\[\]:";'<>?,.#@*-\/\\]).{8,}$/,
    {
      message:
        'Minimum eight characters, at least one letter, one number and one special character',
    },
  )
  @ApiProperty({
    description: 'Password for the account',
    example: 'user@123',
  })
  password: string;

  @MinLength(8, {
    message: 'Confirm Password must be at least 8 characters long',
  })
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!$%^&()_+|~=`{}\[\]:";'<>?,.#@*-\/\\]).{8,}$/,
    {
      message:
        'Minimum eight characters, at least one letter, one number and one special character',
    },
  )
  @ApiProperty({
    description: 'Confirm Password for the account',
    example: 'user@123',
  })
  confirmPassword: string;
}
