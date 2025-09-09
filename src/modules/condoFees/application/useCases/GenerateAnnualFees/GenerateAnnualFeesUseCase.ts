import { inject, injectable } from 'tsyringe';

import {
  ICondoFeesRepository,
  CONDO_FEE_REPOSITORY,
} from '@/modules/condoFees/domain/repositories/ICondoFeesRepository';
import { GenerateFeesDTO } from '@/modules/condoFees/domain/dtos/GenerateFeesDTO';
import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';

@injectable()
export class GenerateAnnualFeesUseCase {
  constructor(
    @inject(CONDO_FEE_REPOSITORY)
    private feesRepository: ICondoFeesRepository,
  ) {}

  async execute({ year, amount }: GenerateFeesDTO): Promise<void> {
    for (let month = 1; month <= 12; month++) {
      const dueDate = new Date(year, month - 1, 10);
      await this.feesRepository.create({
        month,
        year,
        amount,
        status: FeeStatusEnum.PENDING,
        dueDate,
      });
    }
  }
}
