import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticatedUserRequest } from '../interfaces/authenticated-user-request.interface';
import { NextFunction, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticatedUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
    const user = await this.usersService.findById(req.decodedToken.userId);
    req.user = user;
    next();
  }
}
