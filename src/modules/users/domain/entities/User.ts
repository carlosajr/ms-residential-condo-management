import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Apartment } from '@/modules/apartments/domain/entities/Apartment';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @ManyToOne(() => Apartment, (apartment) => apartment.users)
  @JoinColumn({ name: 'apartmentId' })
  apartment!: Apartment;

  @Column()
  apartmentId!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
