import { CallHandler, ExecutionContext, NestInterceptor, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDto } from 'src/users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: Type<any>) {}
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
