import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserCredentialsDto extends PickType(CreateUserDto, ['email', 'password']) {}
