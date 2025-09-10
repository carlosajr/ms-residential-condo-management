import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { CondoExpense } from '@/modules/condoExpenses/domain/entities/CondoExpense';
import { User } from '@/modules/users/domain/entities/User';

@Entity('expense_approvals')
export class ExpenseApproval {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => CondoExpense)
  @JoinColumn({ name: 'expenseId' })
  expense!: CondoExpense;

  @Column()
  expenseId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: number;

  @CreateDateColumn()
  created_at!: Date;
}
