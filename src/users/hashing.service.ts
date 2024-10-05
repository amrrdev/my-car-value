import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashingService {
  private readonly saltRound = 12;

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRound);
    return await bcrypt.hash(password, salt);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
