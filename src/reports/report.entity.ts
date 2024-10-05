import { User } from 'src/users/user.entity';
import { Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Check(`"lat" >= -90 AND "lat" <= 90 AND "lng" >= -180 AND "lng" <= 180`)
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column({ default: false })
  approved: boolean;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  milage: number;

  @Column({ type: 'float', precision: 8, scale: 6 })
  lat: number;

  @Column({ type: 'float', precision: 9, scale: 6 })
  lng: number;

  @ManyToOne(() => User, (user: User) => user.reports)
  user: User;
}
