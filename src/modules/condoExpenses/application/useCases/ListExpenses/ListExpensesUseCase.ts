import { inject, injectable } from 'tsyringe';

import {
  ICondoExpensesRepository,
  CONDO_EXPENSE_REPOSITORY,
} from '@/modules/condoExpenses/domain/repositories/ICondoExpensesRepository';

@injectable()
export class ListExpensesUseCase {
  constructor(
    @inject(CONDO_EXPENSE_REPOSITORY)
    private expensesRepository: ICondoExpensesRepository,
  ) {}

  async execute() {
    return this.expensesRepository.findAll();
  }
}
