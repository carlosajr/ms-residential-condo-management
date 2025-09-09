import { Request } from '@/modules/requests/domain/entities/Request';
import { IGenericRepository } from '@/shared/generic/repositories/IGenericRepository';

export const REQUEST_REPOSITORY = 'REQUEST_REPOSITORY';

export interface IRequestsRepository extends IGenericRepository<Request> {}
