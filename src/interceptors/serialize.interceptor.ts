import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable, tap } from 'rxjs';

export function Serialize<T>(DTO: Type<T>) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly DTO: Type<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> | Promise<Observable<T>> {
    return next.handle().pipe(
      map((response: T) => {
        return plainToClass(this.DTO, response, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
