import { inject, injectable } from 'tsyringe';
import { In } from 'typeorm';

import {
  ICondoFeesRepository,
  CONDO_FEE_REPOSITORY,
} from '@/modules/condoFees/domain/repositories/ICondoFeesRepository';
import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';

@injectable()
export class UpdateFeeStatusUseCase {
  constructor(
    @inject(CONDO_FEE_REPOSITORY)
    private feesRepository: ICondoFeesRepository,
  ) {}

  async execute(externalReference: string): Promise<void> {
    const ids = externalReference.split(',').map(id => Number(id));
    const fees = await this.feesRepository.findAll({
      where: { id: In(ids) } as any,
    });

    for (const fee of fees) {
      await this.feesRepository.update({
        id: fee.id,
        status: FeeStatusEnum.PAID,
      });
    }
  }
}
