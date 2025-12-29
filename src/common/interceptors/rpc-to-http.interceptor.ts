import { isRpcError } from '@common/utils';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class RpcToHttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        // Si es un HttpException (pipes, etc.), dejar pasar el error
        if (error instanceof HttpException) {
          throw error;
        }

        if (isRpcError(error)) {
          throw new HttpException(error.message, error.status);
        }

        // Otros errores inesperados - 500
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
