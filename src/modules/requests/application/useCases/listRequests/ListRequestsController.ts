import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ApiResponse, CommonResponses, Controller, Get, Tags } from '@/shared/http/docs/decorators';
import { ListRequestsUseCase } from './ListRequestsUseCase';
import { Description } from '@/shared/http/docs/decorators/Description';
import { RequestDTO } from '@/modules/requests/domain/dtos/RequestResponseDTO';

@Tags('Requests')
@Controller('requests')
export class ListRequestsController {
  @Get()
  @Description('Lista as solicitações')
  @ApiResponse({
    statusCode: 200,
    dtoClass: [RequestDTO],
    description: 'Listagem de solicitações',
  })
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListRequestsUseCase);
    const result = await useCase.execute();
    return res.json(result);
  }
}
