import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isNoValid = this.reflector.get<boolean>(
      'noValidate',
      context.getHandler(),
    );
    if (isNoValid) return true;

    const request = context.switchToHttp().getRequest();
    // 格式是 Bearer token
    let token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('登录失效');
    }
    token = token.replace('Bearer ', '');
    try {
      // 验证token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('登录失效');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
