import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsNotEmpty({
    message: (args) => {
      return args.value === null || args.value === undefined
        ? 'email is required'
        : 'email should not be empty';
    },
  })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: (args) => {
      return args.value === null || args.value === undefined
        ? 'password is required'
        : 'password should not be empty';
    },
  })
  @ApiProperty()
  password: string;
}
