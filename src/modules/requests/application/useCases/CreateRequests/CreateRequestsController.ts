import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  ApiResponse,
  Body,
  CommonResponses,
  Controller,
  Post,
  Tags,
} from '@/shared/http/docs/decorators';
import { CreateRequestsUseCase } from './CreateRequestsUseCase';
import { CreateRequestDTO } from '@/modules/requests/domain/dtos/CreateRequestDTO';
import { Description } from '@/shared/http/docs/decorators/Description';
import { RequestDTO } from '@/modules/requests/domain/dtos/RequestResponseDTO';

@Tags('Requests')
@Controller('requests')
export class CreateRequestsController {
  @Post()
  @Description('Cria as solicitações')
  @ApiResponse({
    statusCode: 201,
    dtoClass: RequestDTO,
    description: 'Solicitação criado com sucesso',
  })
  @CommonResponses()
  @Body(CreateRequestDTO)
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateRequestsUseCase);
    const result = await useCase.execute(req.body);
    return res.status(201).json(result);
  }
}
