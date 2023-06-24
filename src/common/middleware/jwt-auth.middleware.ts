import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { AuthTokenPayload } from '../interfaces/auth-token-payload.interface';
import { verifyTokenAsync } from '../helpers/jwt-verify-async';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decodedToken = (await verifyTokenAsync(
        token,
        this.config.get<string>('jwt.secret'),
      )) as unknown as AuthTokenPayload;
      req.decodedToken = decodedToken;
      next();
    } else {
      next(new UnauthorizedException());
    }
  }
}
