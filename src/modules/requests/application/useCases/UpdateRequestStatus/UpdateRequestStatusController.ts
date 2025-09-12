import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  ApiResponse,
  Body,
  CommonResponses,
  Controller,
  Patch,
  Post,
  Tags,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { UpdateRequestStatusUseCase } from './UpdateRequestStatusUseCase';
import { CreateRequestDTO } from '@/modules/requests/domain/dtos/CreateRequestDTO';
import { RequestDTO } from '@/modules/requests/domain/dtos/RequestResponseDTO';
import { UpdateStatusRequestDTO } from '@/modules/requests/domain/dtos/UpdateStatusRequestDTO';

@Tags('Requests')
@Controller('requests')
export class UpdateRequestStatusController {
  @Patch('/status')
  @Description('Altera o status da solicitação')
  @ApiResponse({
    statusCode: 202,
    dtoClass: null,
    description: 'Atualização de solicitação efetuada com sucesso',
  })
  @CommonResponses()
  @Body(UpdateStatusRequestDTO)
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(UpdateRequestStatusUseCase);
    await useCase.execute(req.body as CreateRequestDTO);
    return res.status(202).json();
  }
}

