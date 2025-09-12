import { inject, injectable } from 'tsyringe';

import {
  CONDO_EXPENSE_REPOSITORY,
  ICondoExpensesRepository,
} from '@/modules/condoExpenses/domain/repositories/ICondoExpensesRepository';
import {
  EXPENSE_APPROVAL_REPOSITORY,
  IExpenseApprovalsRepository,
} from '@/modules/condoExpenses/domain/repositories/IExpenseApprovalsRepository';
import { IUsersRepository, USER_REPOSITORY } from '@/modules/users/domain/repositories/IUsersRepository';
import { AsaasClient } from '@/shared/providers/asaas/AsaasClient';

@injectable()
export class ApproveExpenseUseCase {
  constructor(
    @inject(CONDO_EXPENSE_REPOSITORY)
    private expensesRepository: ICondoExpensesRepository,
    @inject(EXPENSE_APPROVAL_REPOSITORY)
    private approvalsRepository: IExpenseApprovalsRepository,
    @inject(USER_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ expenseId, userId }: { expenseId: number; userId: number }) {
    const expense = await this.expensesRepository.findById(expenseId);
    if (!expense) {
      throw new Error('Expense not found');
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const already = await this.approvalsRepository.hasUserApproved(expenseId, userId);
    if (!already) {
      await this.approvalsRepository.create({ expenseId, userId });
    }

    const count = await this.approvalsRepository.countByExpense(expenseId);
    if (!expense.paid && expense.pixKey && count >= expense.approvalsRequired) {
      const client = new AsaasClient();
      await client.payPix({
        pixKey: expense.pixKey,
        value: Number(expense.value),
        description: expense.description,
      });
      await this.expensesRepository.update({
        id: expenseId,
        paid: true,
        paidByUserId: userId,
        paidByApartmentId: user.apartmentId,
      });
    }

    return { approvals: count };
  }
}
