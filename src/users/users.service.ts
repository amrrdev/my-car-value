import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`There's no user with this id ${id}`);
    return user;
  }

  async _findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User[]> {
    const users = this.userRepository.find({ where: { email } });
    if (!users) throw new NotFoundException(`There's no users with this email ${email}`);
    return users;
  }

  async create(dto: CreateUserDto): Promise<User> {
    // create new instace from user entity (Record )
    // this is like const newUser = new User()
    const newUser = this.userRepository.create(dto);
    if (!newUser) throw new InternalServerErrorException();
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updatedDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.email ||= updatedDto.email;
    Object.assign(user, updatedDto);
    return await this.userRepository.save(user);
  }
  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
