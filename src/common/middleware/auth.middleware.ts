import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '../interfaces/auth-token-payload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decodedToken = jwt.verify(
        token,
        this.config.get<string>('jwt.secret'),
      ) as AuthTokenPayload;
      console.log(decodedToken);
      next();
    } else {
      next(new UnauthorizedException());
    }
  }
}
