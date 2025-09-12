import { container } from 'tsyringe';
import {
  IRequestsRepository,
  REQUEST_REPOSITORY,
} from '@/modules/requests/domain/repositories/IRequestsRepository';
import { RequestsRepository } from '@/modules/requests/infra/repositories/RequestsRepository';
import {
  ICondoFeesRepository,
  CONDO_FEE_REPOSITORY,
} from '@/modules/condoFees/domain/repositories/ICondoFeesRepository';
import { CondoFeesRepository } from '@/modules/condoFees/infra/repositories/CondoFeesRepository';
import {
  ICondoExpensesRepository,
  CONDO_EXPENSE_REPOSITORY,
} from '@/modules/condoExpenses/domain/repositories/ICondoExpensesRepository';
import { CondoExpensesRepository } from '@/modules/condoExpenses/infra/repositories/CondoExpensesRepository';
import {
  IApartmentsRepository,
  APARTMENT_REPOSITORY,
} from '@/modules/apartments/domain/repositories/IApartmentsRepository';
import { ApartmentsRepository } from '@/modules/apartments/infra/repositories/ApartmentsRepository';
import {
  IUsersRepository,
  USER_REPOSITORY,
} from '@/modules/users/domain/repositories/IUsersRepository';
import { UsersRepository } from '@/modules/users/infra/repositories/UsersRepository';
import {
  IExpenseApprovalsRepository,
  EXPENSE_APPROVAL_REPOSITORY,
} from '@/modules/condoExpenses/domain/repositories/IExpenseApprovalsRepository';
import { ExpenseApprovalsRepository } from '@/modules/condoExpenses/infra/repositories/ExpenseApprovalsRepository';

export async function registerRepositoriesProviders(): Promise<void> {
  container.registerSingleton<IRequestsRepository>(
    REQUEST_REPOSITORY,
    RequestsRepository,
  );
  container.registerSingleton<ICondoFeesRepository>(
    CONDO_FEE_REPOSITORY,
    CondoFeesRepository,
  );
  container.registerSingleton<ICondoExpensesRepository>(
    CONDO_EXPENSE_REPOSITORY,
    CondoExpensesRepository,
  );
  container.registerSingleton<IApartmentsRepository>(
    APARTMENT_REPOSITORY,
    ApartmentsRepository,
  );
  container.registerSingleton<IUsersRepository>(
    USER_REPOSITORY,
    UsersRepository,
  );
  container.registerSingleton<IExpenseApprovalsRepository>(
    EXPENSE_APPROVAL_REPOSITORY,
    ExpenseApprovalsRepository,
  );
}
