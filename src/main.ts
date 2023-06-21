import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

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
  const config = app.get(ConfigService);

  setupDocumentation(app);

  const host = config.get<string>('server.host');
  const port = config.get<number>('server.port');
  await app.listen(port, () => {
    const logger = new Logger('Server');
    logger.log(`Server running on http://${host}:${port}...`);
  });
}

bootstrap();
