import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

import { CondoFee } from '@/modules/condoFees/domain/entities/CondoFee';
import { GenericRepository } from '@/shared/generic/repositories/GenericRepository';
import { ICondoFeesRepository } from '@/modules/condoFees/domain/repositories/ICondoFeesRepository';

@injectable()
export class CondoFeesRepository
  extends GenericRepository<CondoFee>
  implements ICondoFeesRepository
{
  constructor(
    @inject('DataSource')
    dataSource: DataSource,
  ) {
    super(dataSource.getRepository(CondoFee));
  }
}
