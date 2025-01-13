import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Password for the account',
    example: 'StrongPassword1!',
    minLength: 8,
  })
  @IsString()
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
  password: string;
}
