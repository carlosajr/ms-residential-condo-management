import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/users/domain/entities/User';

@Entity('apartments')
export class Apartment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: string;

  @OneToMany(() => User, (user) => user.apartment)
  users!: User[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
