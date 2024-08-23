import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [
      {
        method: RequestMethod.GET,
        path: 'health',
      },
    ],
  });
  app.enableVersioning();

  app.enableCors({
    allowedHeaders: 'Content-Type, Accept, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST',
    // TODO: change origin to a specific domain
    origin: '*',
  });

  // TODO: implement middlewares/interceptors for headers and correlational ids
  await app.listen(process.env.PORT || '3000', process.env.HOST || '0.0.0.0');
}
bootstrap();
