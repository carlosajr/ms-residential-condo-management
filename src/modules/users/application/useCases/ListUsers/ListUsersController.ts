import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Get,
  Tags,
  Description,
  CommonResponses,
  UseMiddleware,
} from '@/shared/http/docs/decorators';
import { ensureAuthenticated } from '@/shared/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@/shared/http/middlewares/ensureAdmin';
import { ListUsersUseCase } from './ListUsersUseCase';

@Tags('Users')
@Controller('users')
export class ListUsersController {
  @Get()
  @Description('List all users')
  @UseMiddleware(ensureAuthenticated, ensureAdmin)
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListUsersUseCase);
    const users = await useCase.execute();
    const sanitized = users.map((u: any) => {
      const { password, ...rest } = u;
      return rest;
    });
    return res.json(sanitized);
  }
}
