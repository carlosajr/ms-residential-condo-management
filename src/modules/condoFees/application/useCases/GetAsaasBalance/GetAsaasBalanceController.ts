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
import { GetAsaasBalanceUseCase } from './GetAsaasBalanceUseCase';
import { AsaasBalanceDTO } from '@/modules/condoFees/domain/dtos/AsaasBalanceDTO';

@Tags('Asaas')
@Controller('asaas')
export class GetAsaasBalanceController {
  @Get('balance')
  @Description('Consulta o saldo da conta Asaas')
  @ApiResponse({
    statusCode: 200,
    description: 'Saldo obtido com sucesso',
    dtoClass: AsaasBalanceDTO,
  })
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GetAsaasBalanceUseCase);
    const result = await useCase.execute();
    return res.json(result);
  }
}

