import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Get,
  Tags,
  Description,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { ListApartmentsUseCase } from './ListApartmentsUseCase';

@Tags('Apartments')
@Controller('apartments')
export class ListApartmentsController {
  @Get()
  @Description('List all apartments')
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListApartmentsUseCase);
    const apartments = await useCase.execute();
    return res.json(apartments);
  }
}
