import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Description,
  Get,
  Tags,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { GetAsaasBalanceUseCase } from './GetAsaasBalanceUseCase';

@Tags('Asaas')
@Controller('asaas')
export class GetAsaasBalanceController {
  @Get('balance')
  @Description('Consulta o saldo da conta Asaas')
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GetAsaasBalanceUseCase);
    const result = await useCase.execute();
    return res.json(result);
  }
}
