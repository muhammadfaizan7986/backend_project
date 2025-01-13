import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationError } from 'class-validator';
import * as session from 'express-session';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
  };

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors
          .map((error) => Object.values(error.constraints || {}).join(', '))
          .join(', ');
        return new BadRequestException(messages);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  app.enableCors(corsOptions);
  app.use(
    session({
      secret: 'your-secret-key', // Replace this with your secret
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000, // 1 minute for the session cookie, adjust as needed
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Fantasy Showdown API')
    .setDescription('The Fantasy Showdown API description')
    .setVersion('1.0')
    .addTag('showdown')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
