import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Description,
  Get,
  Tags,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { GetAsaasTransactionsUseCase } from './GetAsaasTransactionsUseCase';

@Tags('Asaas')
@Controller('asaas')
export class GetAsaasTransactionsController {
  @Get('transactions')
  @Description('Lista o histórico de transações da conta Asaas')
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GetAsaasTransactionsUseCase);
    const result = await useCase.execute();
    return res.json(result);
  }
}
