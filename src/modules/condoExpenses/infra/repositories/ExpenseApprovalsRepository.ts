import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

import { ExpenseApproval } from '@/modules/condoExpenses/domain/entities/ExpenseApproval';
import { IExpenseApprovalsRepository } from '@/modules/condoExpenses/domain/repositories/IExpenseApprovalsRepository';
import { GenericRepository } from '@/shared/generic/repositories/GenericRepository';

@injectable()
export class ExpenseApprovalsRepository
  extends GenericRepository<ExpenseApproval>
  implements IExpenseApprovalsRepository
{
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(dataSource.getRepository(ExpenseApproval));
  }

  async countByExpense(expenseId: number): Promise<number> {
    return this.ormRepo.count({ where: { expenseId } });
  }

  async hasUserApproved(expenseId: number, userId: number): Promise<boolean> {
    const found = await this.ormRepo.findOne({ where: { expenseId, userId } });
    return !!found;
  }
}
