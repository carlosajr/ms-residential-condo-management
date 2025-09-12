import { inject, injectable } from 'tsyringe';
import { In } from 'typeorm';

import {
  ICondoFeesRepository,
  CONDO_FEE_REPOSITORY,
} from '@/modules/condoFees/domain/repositories/ICondoFeesRepository';
import { PayFeesDTO } from '@/modules/condoFees/domain/dtos/PayFeesDTO';
import { AsaasClient } from '@/shared/providers/asaas/AsaasClient';

@injectable()
export class PayCondoFeesUseCase {
  constructor(
    @inject(CONDO_FEE_REPOSITORY)
    private feesRepository: ICondoFeesRepository,
  ) {}

  async execute({ feeIds }: PayFeesDTO) {
    const fees = await this.feesRepository.findAll({
      where: { id: In(feeIds) } as any,
    });

    const total = fees.reduce((acc, fee) => acc + Number(fee.amount), 0);

    const client = new AsaasClient();

    const payment = await client.createPayment({
      customer: process.env.ASAAS_CUSTOMER_ID || '',
      billingType: 'PIX',
      value: total,
      description: 'Condo fees',
      externalReference: feeIds.join(','),
    });

    for (const fee of fees) {
      await this.feesRepository.update({
        id: fee.id,
        asaasPaymentId: payment.id,
        externalReference: feeIds.join(','),
      });
    }

    return payment;
  }
}
