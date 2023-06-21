import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ExceptionsModule } from './exceptions/exception.module';
import { PrismaExceptionFilter } from './exceptions/prisma-exceptions.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serverConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['config/server.env'],
      load: [serverConfig],
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ExceptionsModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          stopAtFirstError: true,
        });
      },
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}
