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
import { GenerateAnnualFeesUseCase } from './GenerateAnnualFeesUseCase';
import { GenerateFeesDTO } from '@/modules/condoFees/domain/dtos/GenerateFeesDTO';
import { MessageResponseDTO } from '@/shared/http/dtos/MessageResponseDTO';

@Tags('CondoFees')
@Controller('condo-fees')
export class GenerateAnnualFeesController {
  @Post('generate')
  @Description('Gera as taxas condominiais do ano informado')
  @ApiResponse({
    statusCode: 201,
    description: 'Taxas geradas com sucesso',
    dtoClass: MessageResponseDTO,
  })
  @Body(GenerateFeesDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GenerateAnnualFeesUseCase);
    await useCase.execute(req.body);
    return res.status(201).json({ message: 'Taxas geradas' });
  }
}

