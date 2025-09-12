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
import { ListExpensesUseCase } from './ListExpensesUseCase';
import { CondoExpenseResponseDTO } from '@/modules/condoExpenses/domain/dtos/CondoExpenseResponseDTO';

@Tags('CondoExpenses')
@Controller('condo-expenses')
export class ListExpensesController {
  @Get()
  @Description('Lista todas as despesas do condomínio')
  @ApiResponse({
    statusCode: 200,
    description: 'Expenses listed successfully',
    dtoClass: [CondoExpenseResponseDTO],
  })
  @CommonResponses()
  async handle(_req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListExpensesUseCase);
    const expenses = await useCase.execute();
    return res.json(expenses);
  }
}

