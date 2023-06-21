import { Module } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma-exceptions.filter';
import { LoginExceptionFilter } from './login-exception.filter';

@Module({
  providers: [PrismaExceptionFilter, LoginExceptionFilter],
  exports: [PrismaExceptionFilter, LoginExceptionFilter],
})
export class ExceptionsModule {}
