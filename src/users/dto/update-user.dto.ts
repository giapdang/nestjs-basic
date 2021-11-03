import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be a string' })
  @MinLength(2, {
    message: 'name must be longer than or equal to 2 characters',
  })
  @ApiProperty({ description: 'Name', required: true })
  readonly name: string;
}
