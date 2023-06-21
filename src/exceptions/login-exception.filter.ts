import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class LoginExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    if (
      exception instanceof UnauthorizedException ||
      exception instanceof Prisma.PrismaClientKnownRequestError
    ) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid email or password',
        error: 'Unauthorized',
      });
    } else {
      super.catch(exception, host);
    }
  }
}
