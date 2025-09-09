import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

import { Request } from '@/modules/requests/domain/entities/Request';
import { GenericRepository } from '@/shared/generic/repositories/GenericRepository';
import { IRequestsRepository } from '../../domain/repositories/IRequestsRepository';

@injectable()
export class RequestsRepository extends GenericRepository<Request> implements IRequestsRepository {
  constructor(
    @inject('DataSource')
    dataSource: DataSource,
  ) {
    super(dataSource.getRepository(Request));
  }
}
