import { User } from '@/modules/users/domain/entities/User';
import { IGenericRepository } from '@/shared/generic/repositories/IGenericRepository';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUsersRepository extends IGenericRepository<User> {}
