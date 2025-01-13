import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKIP_INTERCEPTOR_KEY } from 'src/decorators/skip.interceptor.decorator';

interface ResponseFormat<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    // Check if the handler has the `SkipInterceptor` metadata
    const skipInterceptor = this.reflector.get<boolean>(
      SKIP_INTERCEPTOR_KEY,
      context.getHandler(),
    );

    if (skipInterceptor) {
      // Skip the interceptor logic and pass through the original data
      return next.handle();
    }

    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    // Retrieve the custom message from the metadata
    const customMessage = this.reflector.get<string>(
      'Message',
      context.getHandler(),
    );
    const message = customMessage || 'Success';

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message,
        data,
      })),
    );
  }
}
