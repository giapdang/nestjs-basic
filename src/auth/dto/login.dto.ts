import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class BaseLoginInfo {
  @IsNotEmpty({ message: 'username should not be empty' })
  @IsString({ message: 'username must be a string' })
  @MinLength(4, {
    message: 'username must be longer than or equal to 4 characters',
  })
  @ApiProperty({ description: 'Username', required: true })
  readonly username: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, {
    message: 'password must be longer than or equal to 8 characters',
  })
  @ApiProperty({ description: 'Password', required: true })
  readonly password: string;
}

export class LoginDto extends BaseLoginInfo { }
