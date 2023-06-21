import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: (args) => {
        return `'${args.value}' is not a valid email`;
      },
    },
  )
  @IsNotEmpty({
    message: (args) => {
      return args.value === null || args.value === undefined
        ? 'Email is required'
        : 'Email should not be empty';
    },
  })
  email: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: `Password must be at least 8 characters long and must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol`,
    },
  )
  @IsNotEmpty({
    message: (args) => {
      return args.value === null || args.value === undefined
        ? 'Password is required'
        : 'Password should not be empty';
    },
  })
  password: string;
}
