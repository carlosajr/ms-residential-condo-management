import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
