import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('condo_expenses')
export class CondoExpense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @Column('date')
  date!: Date;

  @Column({ nullable: true })
  receiptUrl?: string;

  @Column({ nullable: true })
  pixKey?: string;

  @Column({ type: 'int', default: 0 })
  approvalsRequired!: number;

  @Column({ default: false })
  paid!: boolean;

  @Column({ nullable: true })
  paidByUserId?: number;

  @Column({ nullable: true })
  paidByApartmentId?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
