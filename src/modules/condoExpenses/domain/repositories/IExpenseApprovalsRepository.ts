import { ExpenseApproval } from '@/modules/condoExpenses/domain/entities/ExpenseApproval';
import { IGenericRepository } from '@/shared/generic/repositories/IGenericRepository';

export const EXPENSE_APPROVAL_REPOSITORY = 'EXPENSE_APPROVAL_REPOSITORY';

export interface IExpenseApprovalsRepository
  extends IGenericRepository<ExpenseApproval> {
  countByExpense(expenseId: number): Promise<number>;
  hasUserApproved(expenseId: number, userId: number): Promise<boolean>;
}
