import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Report } from './../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report: Report) => report.user)
  reports: Report[];

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
