import { inject, injectable } from 'tsyringe';

import {
  ICondoExpensesRepository,
  CONDO_EXPENSE_REPOSITORY,
} from '@/modules/condoExpenses/domain/repositories/ICondoExpensesRepository';

@injectable()
export class CreateExpenseUseCase {
  constructor(
    @inject(CONDO_EXPENSE_REPOSITORY)
    private expensesRepository: ICondoExpensesRepository,
  ) {}

  async execute({
    description,
    value,
    date,
    receiptUrl,
    pixKey,
    approvalsRequired,
  }: {
    description: string;
    value: number;
    date: Date;
    receiptUrl?: string;
    pixKey?: string;
    approvalsRequired: number;
  }) {
    const expense = await this.expensesRepository.create({
      description,
      value,
      date,
      receiptUrl,
      pixKey,
      approvalsRequired,
    });
    
    return expense;
  }
}
