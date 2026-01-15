import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcToHttpExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('GatewayClient');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  await app.listen(envs.PORT);
  logger.log(`Application is running on port ${envs.PORT}`);
}
void bootstrap();
