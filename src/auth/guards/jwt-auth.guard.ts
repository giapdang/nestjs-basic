import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request?.headers?.authorization;
    const bearerToken = authorizationHeader?.replace(/Bearer/, '');
    if (!bearerToken || bearerToken === '') {
      throw new HttpException(
        'An access token is required to request this resource.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return request;
    }
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err ||
        new HttpException('Invalid Auth access token.', HttpStatus.UNAUTHORIZED)
      );
    }
    return user;
  }
}
