import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Description,
  Param,
  Post,
  Tags,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { ApproveExpenseUseCase } from './ApproveExpenseUseCase';
import { IsNumber } from 'class-validator';

class ApproveExpenseDTO {
  @IsNumber()
  userId!: number;
}

@Tags('CondoExpenses')
@Controller('condo-expenses')
export class ApproveExpenseController {
  @Post(':id/approve')
  @Description('Approve payment of an expense')
  @Body(ApproveExpenseDTO)
  @Param('id')
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ApproveExpenseUseCase);
    const { id } = req.params;
    const { userId } = req.body;
    const result = await useCase.execute({ expenseId: Number(id), userId });
    return res.json(result);
  }
}
