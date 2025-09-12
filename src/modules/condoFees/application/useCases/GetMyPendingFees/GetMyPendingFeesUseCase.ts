import { inject, injectable } from 'tsyringe';

import {
  ICondoFeesRepository,
  CONDO_FEE_REPOSITORY,
} from '@/modules/condoFees/domain/repositories/ICondoFeesRepository';
import {
  IUsersRepository,
  USER_REPOSITORY,
} from '@/modules/users/domain/repositories/IUsersRepository';
import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';
import { AppError } from '@/shared/core/errors/AppError';

@injectable()
export class GetMyPendingFeesUseCase {
  constructor(
    @inject(CONDO_FEE_REPOSITORY)
    private feesRepository: ICondoFeesRepository,
    @inject(USER_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: number) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404, 'business');

    const fees = await this.feesRepository.findAll({
      where: {
        apartmentId: user.apartmentId,
        status: FeeStatusEnum.PENDING,
      } as any,
    });

    const count = fees.length;
    const total = fees.reduce((acc, fee) => acc + Number(fee.amount), 0);

    return { hasPending: count > 0, count, total };
  }
}
