import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IUsersRepository, USER_REPOSITORY } from '@/modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@/shared/core/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class LoginUseCase {
  constructor(
    @inject(USER_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new AppError('Invalid credentials', 401, 'auth');

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) throw new AppError('Invalid credentials', 401, 'auth');

    const token = sign(
      { email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      {
        subject: String(user.id),
        expiresIn: '1d',
      },
    );

    return { token };
  }
}
