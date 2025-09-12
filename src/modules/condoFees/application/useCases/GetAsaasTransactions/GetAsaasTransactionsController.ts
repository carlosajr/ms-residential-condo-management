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
import { GetAsaasTransactionsUseCase } from './GetAsaasTransactionsUseCase';
import { AsaasTransactionDTO } from '@/modules/condoFees/domain/dtos/AsaasTransactionDTO';

@Tags('Asaas')
@Controller('asaas')
export class GetAsaasTransactionsController {
  @Get('transactions')
  @Description('Lista o histórico de transações da conta Asaas')
  @ApiResponse({
    statusCode: 200,
    description: 'Transações listadas com sucesso',
    dtoClass: [AsaasTransactionDTO],
  })
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GetAsaasTransactionsUseCase);
    const result = await useCase.execute();
    return res.json(result);
  }
}

