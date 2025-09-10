import { inject, injectable } from 'tsyringe';

import { IUsersRepository, USER_REPOSITORY } from '@/modules/users/domain/repositories/IUsersRepository';

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject(USER_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute() {
    return this.usersRepository.findAll({ relations: ['apartment'] });
  }
}
