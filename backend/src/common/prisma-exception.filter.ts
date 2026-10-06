import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../generated/prisma/client.js';

/** Maps well-known Prisma errors to meaningful HTTP responses. */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const httpError = this.toHttpException(error);
    response.status(httpError.getStatus()).json(httpError.getResponse());
  }

  private toHttpException(
    error: Prisma.PrismaClientKnownRequestError,
  ): HttpException {
    switch (error.code) {
      case 'P2025':
        return new NotFoundException('Resource not found');
      case 'P2002':
        return new ConflictException('A resource with that value already exists');
      default:
        return new HttpException('Database error', 500);
    }
  }
}
