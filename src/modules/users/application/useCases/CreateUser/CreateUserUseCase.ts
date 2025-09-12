import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersRepository, USER_REPOSITORY } from '@/modules/users/domain/repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(USER_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    apartmentId,
    password,
    isAdmin = false,
  }: {
    name: string;
    email: string;
    phone: string;
    apartmentId: number;
    password: string;
    isAdmin?: boolean;
  }) {
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      apartmentId,
      password: hashedPassword,
      isAdmin,
    });
    return user;
  }
}
