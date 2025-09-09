import { container } from 'tsyringe';
import {
  IRequestsRepository,
  REQUEST_REPOSITORY,
} from '@/modules/requests/domain/repositories/IRequestsRepository';
import { RequestsRepository } from '@/modules/requests/infra/repositories/RequestsRepository';

export async function registerRepositoriesProviders(): Promise<void> {
  container.registerSingleton<IRequestsRepository>(REQUEST_REPOSITORY, RequestsRepository);
}
