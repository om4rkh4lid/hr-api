import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2025':
        const resource = exception.message.split(' ')[1].toLowerCase();
        const response = {
          statusCode: HttpStatus.NOT_FOUND,
          message: `The requested ${resource} doesn't exist`,
          error: 'Not Found',
        };
        res.status(HttpStatus.NOT_FOUND).json(response);
        break;
      case 'P2002':
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `This ${exception.meta.target} is already in use`,
          error: 'Conflict',
        });
        break;
      default:
        console.log(exception.code);
        super.catch(exception, host);
        break;
    }
  }
}
