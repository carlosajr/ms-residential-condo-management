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

interface IRequest {
  userId: number;
  status?: FeeStatusEnum;
  year?: number;
}

@injectable()
export class ListMyFeesUseCase {
  constructor(
    @inject(CONDO_FEE_REPOSITORY)
    private feesRepository: ICondoFeesRepository,
    @inject(USER_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, status, year }: IRequest) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404, 'business');

    const where: any = { apartmentId: user.apartmentId };
    if (status) where.status = status;
    if (year) where.year = year;

    const fees = await this.feesRepository.findAll({ where, order: { year: 'ASC', month: 'ASC' } as any });
    return fees;
  }
}
