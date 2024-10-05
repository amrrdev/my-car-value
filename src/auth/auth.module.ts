import { Module } from '@nestjs/common';
import { HashingService } from 'src/users/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class AuthModule {}
