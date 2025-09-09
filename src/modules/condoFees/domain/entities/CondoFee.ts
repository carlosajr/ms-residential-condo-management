import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';

@Entity('condo_fees')
export class CondoFee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  month!: number;

  @Column()
  year!: number;

  @Column('decimal')
  amount!: number;

  @Column({ type: 'varchar', default: FeeStatusEnum.PENDING })
  status!: FeeStatusEnum;

  @Column({ nullable: true })
  asaasPaymentId?: string;

  @Column({ nullable: true })
  externalReference?: string;

  @Column({ type: 'date' })
  dueDate!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
