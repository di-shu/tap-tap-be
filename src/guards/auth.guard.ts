import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt'; // For JWT-based session
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    userId: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IGetUserAuthInfoRequest = context
      .switchToHttp()
      .getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No session token provided');
    }

    const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'

    try {
      // Verify JWT
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      // Check if session exists and is valid in DB
      const session = await this.prisma.session.findUnique({
        where: { session_token: token },
      });

      if (!session) {
        throw new UnauthorizedException('Session expired');
      }

      request.user = decoded; // Attach user info to the request object
      return true;
    } catch (err) {
      log(err);
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
