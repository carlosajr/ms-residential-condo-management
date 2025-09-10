import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Controller,
  Description,
  Get,
  Tags,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { ListExpensesUseCase } from './ListExpensesUseCase';

@Tags('CondoExpenses')
@Controller('condo-expenses')
export class ListExpensesController {
  @Get()
  @Description('Lista todas as despesas do condomínio')
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListExpensesUseCase);
    const expenses = await useCase.execute();
    return res.json(expenses);
  }
}
