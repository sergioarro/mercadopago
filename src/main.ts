import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const title = 'Nestjs Api Mercadolibre';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('Please change this description a more meaningful one')
    .setVersion(process.env.npm_package_version || '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: `${title} - Swagger UI`,
  });

  // TODO: implement middlewares/interceptors for headers and correlational ids
  await app.listen(process.env.PORT || '3000', process.env.HOST || '0.0.0.0');
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
