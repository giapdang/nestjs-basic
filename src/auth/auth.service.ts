import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsernameIncludedPassword(
      username,
    );
    if (user) {
      const isPasswordMatched = await bcrypt.compare(pass, user.password);
      if (isPasswordMatched) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async login(user: LoginDto): Promise<any> {
    const { username, password } = user;
    const checkUser = await this.validateUser(username, password);
    if (checkUser) {
      const payload = { user_id: checkUser.id };
      return {
        user: {
          name: checkUser.name,
          user_id: checkUser.id,
        },
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          secret: this.configService.get<string>('jwt.refreshSecret'),
          expiresIn: this.configService.get<string>('jwt.refreshExpire'),
          issuer: this.configService.get<string>('jwt.issuer'),
        }),
      };
    } else {
      throw new HttpException(
        'Login was not successfully',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(user: RegisterDto): Promise<any> {
    const { name, username, password } = user;
    const isUserMatched = await this.usersService.findByEmail(
      username.toLowerCase(),
    );
    if (isUserMatched) {
      throw new HttpException(
        'User is already registered',
        HttpStatus.CONFLICT,
      );
    } else {
      await this.usersService.create({
        username,
        password,
        name,
      });
      return {
        name,
        username,
      };
    }
  }

  async getToken(refreshToken: string): Promise<any> {
    const isValidToken = await this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      issuer: this.configService.get<string>('jwt.issuer'),
    });
    if (isValidToken) {
      const userInfo: any = await this.jwtService.decode(refreshToken);
      const { user_id } = userInfo;
      const payload = { user_id };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          secret: this.configService.get<string>('jwt.refreshSecret'),
          expiresIn: this.configService.get<string>('jwt.refreshExpire'),
          issuer: this.configService.get<string>('jwt.issuer'),
        }),
      };
    }
    throw new HttpException(
      'Invalid Auth refresh token.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
