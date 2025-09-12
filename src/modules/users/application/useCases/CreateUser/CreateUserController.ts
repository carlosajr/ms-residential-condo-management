import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Post,
  Tags,
  CommonResponses,
  UseMiddleware,
  ApiResponse,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { ensureAuthenticated } from '@/shared/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@/shared/http/middlewares/ensureAdmin';
import { CreateUserDTO } from '@/modules/users/domain/dtos/CreateUserDTO';
import { UserResponseDTO } from '@/modules/users/domain/dtos/UserResponseDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

@Tags('Users')
@Controller('users')
export class CreateUserController {
  @Post()
  @Description('Create a new user')
  @ApiResponse({
    statusCode: 201,
    description: 'User created successfully',
    dtoClass: UserResponseDTO,
  })
  @Body(CreateUserDTO)
  @UseMiddleware(ensureAuthenticated, ensureAdmin)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateUserUseCase);
    const user = await useCase.execute(req.body);
    const { password: _, ...userWithoutPassword } = user as any;
    return res.status(201).json(userWithoutPassword);
  }
}

