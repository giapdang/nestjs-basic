import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post('token')
  @ApiOperation({ summary: 'Get new token' })
  @ApiBody({ type: TokenDto })
  async getToken(@Body('refresh_token') token: string) {
    return await this.authService.getToken(token);
  }
}
