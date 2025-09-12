import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

import { Apartment } from '@/modules/apartments/domain/entities/Apartment';
import { IApartmentsRepository } from '@/modules/apartments/domain/repositories/IApartmentsRepository';
import { GenericRepository } from '@/shared/generic/repositories/GenericRepository';

@injectable()
export class ApartmentsRepository
  extends GenericRepository<Apartment>
  implements IApartmentsRepository
{
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(dataSource.getRepository(Apartment));
  }
}
