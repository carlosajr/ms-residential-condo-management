import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Get,
  Tags,
  CommonResponses,
  UseMiddleware,
  ApiResponse,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { ensureAuthenticated } from '@/shared/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@/shared/http/middlewares/ensureAdmin';
import { ListUsersUseCase } from './ListUsersUseCase';
import { UserResponseDTO } from '@/modules/users/domain/dtos/UserResponseDTO';

@Tags('Users')
@Controller('users')
export class ListUsersController {
  @Get()
  @Description('List all users')
  @ApiResponse({
    statusCode: 200,
    description: 'Users listed successfully',
    dtoClass: [UserResponseDTO],
  })
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

