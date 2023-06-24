import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { PrismaExceptionFilter } from './common/exceptions/prisma-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthMiddleware } from './common/middleware/jwt-auth.middleware';
import { jwtConfig, serverConfig } from './common/config';
import { TokenExceptionFilter } from './common/exceptions/token-exception.filter';
import { EmployeesModule } from './employees/employees.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthenticatedEmployeeMiddleware } from './common/middleware/authenticated-employee.middleware';
import { EmployeesService } from './employees/employees.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['config/server.env', 'config/jwt.env'],
      load: [serverConfig, jwtConfig],
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    EmployeesModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    EmployeesService,
    UsersService,
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
    {
      provide: APP_FILTER,
      useClass: TokenExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude('health', 'auth/login')
      .forRoutes('*');
    consumer.apply(AuthenticatedEmployeeMiddleware).forRoutes('attendance');
  }
}
