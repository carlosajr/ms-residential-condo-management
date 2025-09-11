import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Description,
  Post,
  Tags,
  ApiParam,
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
  @ApiParam({
    name: 'id',
    description: 'Id da conta a ser paga',
    type: 'number',
    example: '10',
  })
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ApproveExpenseUseCase);
    const { id } = req.params;
    const { userId } = req.body;
    const result = await useCase.execute({ expenseId: Number(id), userId });
    return res.json(result);
  }
}
