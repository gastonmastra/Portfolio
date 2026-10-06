import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, type IEntryNestModule } from '@nestjs/core';
import { PrismaExceptionFilter } from './prisma-exception.filter.js';

interface BootstrapOptions {
  name: string;
  port: number;
}

/** Shared startup logic for both the public and the admin API. */
export async function bootstrapApi(
  module: IEntryNestModule,
  { name, port }: BootstrapOptions,
): Promise<void> {
  const app = await NestFactory.create(module);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(port);
  Logger.log(`${name} listening on port ${port}`, 'Bootstrap');
}
