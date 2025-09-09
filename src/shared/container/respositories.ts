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

export async function registerRepositoriesProviders(): Promise<void> {
  container.registerSingleton<IRequestsRepository>(
    REQUEST_REPOSITORY,
    RequestsRepository,
  );
  container.registerSingleton<ICondoFeesRepository>(
    CONDO_FEE_REPOSITORY,
    CondoFeesRepository,
  );
}
