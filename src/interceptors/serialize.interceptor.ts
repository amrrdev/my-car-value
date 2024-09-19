import { CallHandler, ExecutionContext, NestInterceptor, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly DTO: Type<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        return plainToClass(this.DTO, response, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
