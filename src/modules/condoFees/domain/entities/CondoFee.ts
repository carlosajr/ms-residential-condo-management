import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';
import { Apartment } from '@/modules/apartments/domain/entities/Apartment';

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

  @ManyToOne(() => Apartment, (apartment) => apartment.id)
  @JoinColumn({ name: 'apartmentId' })
  apartment!: Apartment;

  @Column()
  apartmentId!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
