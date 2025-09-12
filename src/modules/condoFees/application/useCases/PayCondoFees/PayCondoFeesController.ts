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
import { PayFeesDTO } from '@/modules/condoFees/domain/dtos/PayFeesDTO';
import { PayCondoFeesUseCase } from './PayCondoFeesUseCase';
import { AsaasPaymentResponseDTO } from '@/modules/condoFees/domain/dtos/AsaasPaymentResponseDTO';

@Tags('CondoFees')
@Controller('condo-fees')
export class PayCondoFeesController {
  @Post('pay')
  @Description('Cria cobrança via Asaas para taxas selecionadas')
  @ApiResponse({
    statusCode: 201,
    description: 'Pagamento criado com sucesso',
    dtoClass: AsaasPaymentResponseDTO,
  })
  @Body(PayFeesDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(PayCondoFeesUseCase);
    const result = await useCase.execute(req.body);
    return res.status(201).json(result);
  }
}

