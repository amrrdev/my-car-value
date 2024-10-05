import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

class Repository {}

class Service {
  constructor(private repo: Repository) {}
}

class Controller {
  constructor(private service: Service) {}
}

const controller = new Controller(new Service(new Repository()));

export function Serialize<T>(DTO: Type<T>) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly DTO: Type<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((response: T) => {
        return plainToClass(this.DTO, response, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
