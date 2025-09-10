import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

import { CondoExpense } from '@/modules/condoExpenses/domain/entities/CondoExpense';
import { GenericRepository } from '@/shared/generic/repositories/GenericRepository';
import { ICondoExpensesRepository } from '@/modules/condoExpenses/domain/repositories/ICondoExpensesRepository';

@injectable()
export class CondoExpensesRepository
  extends GenericRepository<CondoExpense>
  implements ICondoExpensesRepository
{
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(dataSource.getRepository(CondoExpense));
  }
}
