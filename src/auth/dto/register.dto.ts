import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseLoginInfo } from './login.dto';

export class AdditionalRegisterInfo {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  @MinLength(2, {
    message: 'name must be longer than or equal to 2 characters',
  })
  @ApiProperty({ description: 'Name', required: true })
  readonly name: string;
}

export class RegisterDto extends IntersectionType(
  BaseLoginInfo,
  AdditionalRegisterInfo,
) {}
