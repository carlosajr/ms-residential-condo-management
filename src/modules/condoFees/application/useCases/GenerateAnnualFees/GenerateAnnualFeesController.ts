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
import { GenerateAnnualFeesUseCase } from './GenerateAnnualFeesUseCase';
import { GenerateFeesDTO } from '@/modules/condoFees/domain/dtos/GenerateFeesDTO';

@Tags('CondoFees')
@Controller('condo-fees')
export class GenerateAnnualFeesController {
  @Post('generate')
  @Description('Gera as taxas condominiais do ano informado')
  @Body(GenerateFeesDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GenerateAnnualFeesUseCase);
    await useCase.execute(req.body);
    return res.status(201).json({ message: 'Taxas geradas' });
  }
}
