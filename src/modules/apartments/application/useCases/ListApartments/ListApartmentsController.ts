import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Get,
  Tags,
  CommonResponses,
  ApiResponse,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { ListApartmentsUseCase } from './ListApartmentsUseCase';
import { ApartmentResponseDTO } from '@/modules/apartments/domain/dtos/ApartmentResponseDTO';

@Tags('Apartments')
@Controller('apartments')
export class ListApartmentsController {
  @Get()
  @Description('List all apartments')
  @ApiResponse({
    statusCode: 200,
    description: 'Apartments listed successfully',
    dtoClass: [ApartmentResponseDTO],
  })
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListApartmentsUseCase);
    const apartments = await useCase.execute();
    return res.json(apartments);
  }
}

