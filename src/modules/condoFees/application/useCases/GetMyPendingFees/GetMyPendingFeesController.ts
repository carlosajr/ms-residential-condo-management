import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Get,
  Tags,
  Description,
  CommonResponses,
  UseMiddleware,
} from '@/shared/http/docs/decorators';
import { ensureAuthenticated } from '@/shared/http/middlewares/ensureAuthenticated';
import { GetMyPendingFeesUseCase } from './GetMyPendingFeesUseCase';

@Tags('CondoFees')
@Controller('condo-fees')
export class GetMyPendingFeesController {
  @Get('me/pending-summary')
  @Description('Resumo de taxas pendentes do meu apartamento')
  @UseMiddleware(ensureAuthenticated)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(GetMyPendingFeesUseCase);
    const result = await useCase.execute(Number(req.user!.id));
    return res.json(result);
  }
}
