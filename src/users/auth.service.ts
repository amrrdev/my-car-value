import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async singup(userCredentialsDto: UserCredentialsDto) {
    const user = await this.userService.findByEmail(userCredentialsDto.email);
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.hashingService.hash(userCredentialsDto.password);
    const newUser = await this.userService.create({
      email: userCredentialsDto.email,
      password: hashedPassword,
    });

    // TODO: Generate a JWT and attach it with the response

    return newUser;
  }

  async login(userCredentialsDto: UserCredentialsDto) {
    const user = await this.userService.findByEmail(userCredentialsDto.email);
    if (!user || !(await this.hashingService.compare(userCredentialsDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // TODO: Generate JWT token

    return user;
  }
}
