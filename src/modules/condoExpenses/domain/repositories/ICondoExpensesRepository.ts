import { CondoExpense } from '@/modules/condoExpenses/domain/entities/CondoExpense';
import { IGenericRepository } from '@/shared/generic/repositories/IGenericRepository';

export const CONDO_EXPENSE_REPOSITORY = 'CONDO_EXPENSE_REPOSITORY';

export interface ICondoExpensesRepository
  extends IGenericRepository<CondoExpense> {}
