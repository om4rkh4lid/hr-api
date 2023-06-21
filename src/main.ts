import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConfig } from './config/ServerConfig';
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupDocumentation = (app: INestApplication) => {
  const documentConfig = new DocumentBuilder()
    .setTitle('EasyHR')
    .setDescription('The EasyHR API documentation')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ServerConfig);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  setupDocumentation(app);

  await app.listen(config.port, () => {
    const logger = new Logger('Server');
    logger.log(`Server running on http://${config.host}:${config.port}...`);
  });
}

bootstrap();
