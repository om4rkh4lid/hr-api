import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/schemas/server.config';
import { ServerConfig } from './config/ServerConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['config/server.env'],
      load: [serverConfig],
    }),
  ],
  controllers: [AppController],
  providers: [ServerConfig],
})
export class AppModule {}
