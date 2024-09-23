import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert(): void {
    console.log('user inserted🥳🍾🥂', this.id);
  }

  @AfterUpdate()
  logUpdate(): void {
    console.log('user updated', this);
  }

  @AfterRemove()
  logRemove(): void {
    console.log('user removed', this);
  }
}
