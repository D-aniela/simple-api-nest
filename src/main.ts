import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * SUPER IMPORTANT
   * SUPER IMPORTANT
   * JUST IN DEVELOPMENT ENVIRONMENT
   * SUPER IMPORTANT
   * SUPER IMPORTANT
   */
  // TODO QUITAR EL ENABLE CORS
  // only in development enviroment
  app.enableCors();
  app.use(
    session({
      secret: 'HarryPopotes',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // Habilitar validación y transformación global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api/v1');
  await app.listen(3001);
}
bootstrap();
