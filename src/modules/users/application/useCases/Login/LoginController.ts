import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Post,
  Tags,
  Description,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { LoginDTO } from '@/modules/users/domain/dtos/LoginDTO';
import { LoginUseCase } from './LoginUseCase';

@Tags('Auth')
@Controller('sessions')
export class LoginController {
  @Post()
  @Description('Authenticate user')
  @Body(LoginDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(LoginUseCase);
    const token = await useCase.execute(req.body);
    return res.json(token);
  }
}
