import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Get,
  Tags,
  CommonResponses,
  UseMiddleware,
  ApiResponse,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { ensureAuthenticated } from '@/shared/http/middlewares/ensureAuthenticated';
import { GetMyPendingFeesUseCase } from './GetMyPendingFeesUseCase';
import { PendingFeesSummaryDTO } from '@/modules/condoFees/domain/dtos/PendingFeesSummaryDTO';

@Tags('CondoFees')
@Controller('condo-fees')
export class GetMyPendingFeesController {
  @Get('me/pending-summary')
  @Description('Resumo de taxas pendentes do meu apartamento')
  @ApiResponse({
    statusCode: 200,
    description: 'Resumo obtido com sucesso',
    dtoClass: PendingFeesSummaryDTO,
  })
  @UseMiddleware(ensureAuthenticated)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GetMyPendingFeesUseCase);
    const result = await useCase.execute(Number(req.user!.id));
    return res.json(result);
  }
}

