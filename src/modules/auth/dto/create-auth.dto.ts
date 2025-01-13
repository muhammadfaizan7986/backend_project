import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class SignInInput {
  @IsNotEmpty()
  @MaxLength(25, {
    message: 'Max. length of 25 character for full Name',
  })
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName: string;

  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    {
      message: 'Invalid email format',
    },
  )
  @ApiProperty({
    description: 'Email address of the user',
    example: 'jhonDoe@gmail.com',
  })
  email: string;

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
    example: 'jhonDoe@123',
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
    example: 'jhonDoe@123',
  })
  confirmPassword: string;

  // @IsNotEmpty()
  // @ApiProperty({
  //   description:
  //     'Please accept the Terms of Service and Privacy Policy to proceed.',
  //   example: true,
  // })
  // terms: boolean;
}
