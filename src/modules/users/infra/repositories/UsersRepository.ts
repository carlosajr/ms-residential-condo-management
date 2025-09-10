import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

import { User } from '@/modules/users/domain/entities/User';
import { IUsersRepository } from '@/modules/users/domain/repositories/IUsersRepository';
import { GenericRepository } from '@/shared/generic/repositories/GenericRepository';

@injectable()
export class UsersRepository
  extends GenericRepository<User>
  implements IUsersRepository
{
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(dataSource.getRepository(User));
  }
}
