import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Post,
  Tags,
  CommonResponses,
  ApiResponse,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { LoginDTO } from '@/modules/users/domain/dtos/LoginDTO';
import { LoginUseCase } from './LoginUseCase';
import { LoginResponseDTO } from '@/modules/users/domain/dtos/LoginResponseDTO';

@Tags('Auth')
@Controller('sessions')
export class LoginController {
  @Post()
  @Description('Authenticate user')
  @ApiResponse({
    statusCode: 200,
    description: 'Authentication successful',
    dtoClass: LoginResponseDTO,
  })
  @Body(LoginDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(LoginUseCase);
    const token = await useCase.execute(req.body);
    return res.json(token);
  }
}

