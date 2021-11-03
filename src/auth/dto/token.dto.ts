import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @IsNotEmpty({ message: 'refresh token should not be empty' })
  @IsString({ message: 'refresh token must be a string' })
  @ApiProperty({ description: 'Refresh Token', required: true })
  readonly refresh_token: string;
}
