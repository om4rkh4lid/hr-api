import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/schemas/server.config';
import { ServerConfig } from './config/ServerConfig';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['config/server.env'],
      load: [serverConfig],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    ServerConfig,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
})
export class AppModule {}
