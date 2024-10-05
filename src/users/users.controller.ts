import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Session,
  ParseIntPipe,
  Delete,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get('whoami')
  @UseInterceptors(CurrentUserInterceptor)
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Get('signout')
  signOut(@Session() session: any) {
    session.userId = null;
    console.log('amr');
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post('login')
  async login(@Body() userCredentialsDto: UserCredentialsDto, @Session() session: any) {
    const user = await this.authService.login(userCredentialsDto);
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.singup(createUserDto);
    session.userId = user.id;
    console.log(session.userId);
    return user;
  }

  @Patch(':id')
  updateUser(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updatedDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updatedDto);
  }

  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.userService.remove(id);
  }
}
