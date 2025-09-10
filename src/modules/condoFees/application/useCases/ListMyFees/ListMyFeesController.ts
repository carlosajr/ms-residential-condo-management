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
import { ListMyFeesUseCase } from './ListMyFeesUseCase';
import { FeeStatusEnum } from '@/modules/condoFees/domain/enums/fee-status.enum';

@Tags('CondoFees')
@Controller('condo-fees')
export class ListMyFeesController {
  @Get('me')
  @Description('Lista taxas do meu apartamento')
  @UseMiddleware(ensureAuthenticated)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListMyFeesUseCase);

    const { status, year } = req.query;
    const parsedStatus = typeof status === 'string' ? (status.toUpperCase() as FeeStatusEnum) : undefined;
    const parsedYear = year ? Number(year) : undefined;

    const fees = await useCase.execute({
      userId: Number(req.user!.id),
      status: parsedStatus,
      year: parsedYear,
    });

    return res.json(fees);
  }
}
