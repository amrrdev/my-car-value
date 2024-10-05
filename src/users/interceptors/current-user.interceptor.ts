import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session?.userId;

    if (!userId) {
      throw new UnauthorizedException('User ID is missing in session');
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.currentUser = user;
    return next.handle();
  }
}
