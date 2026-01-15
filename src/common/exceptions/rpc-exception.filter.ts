import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { isRpcError } from '../guards/rpc-error.guard';

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception.getError();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Microservice error';

    if (isRpcError(error)) {
      status = error.status;
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
