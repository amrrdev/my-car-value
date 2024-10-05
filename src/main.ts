import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    cookieSession({
      keys: ['keys409308kawdljsjdkkasjljdlsjkdjs'],
    }),
  );
  await app.listen(3000);
  Logger.log(`Application is running on port: 3000`);
}
bootstrap();
