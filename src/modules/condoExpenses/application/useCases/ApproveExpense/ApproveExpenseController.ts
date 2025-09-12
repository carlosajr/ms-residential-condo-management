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
import { ApproveExpenseUseCase } from './ApproveExpenseUseCase';
import { IsNumber } from 'class-validator';
import { ApproveExpenseResponseDTO } from '@/modules/condoExpenses/domain/dtos/ApproveExpenseResponseDTO';

class ApproveExpenseDTO {
  @IsNumber()
  userId!: number;
}

@Tags('CondoExpenses')
@Controller('condo-expenses')
export class ApproveExpenseController {
  @Post(':id/approve')
  @Description('Approve payment of an expense')
  @ApiResponse({
    statusCode: 200,
    description: 'Expense approval recorded',
    dtoClass: ApproveExpenseResponseDTO,
  })
  @Body(ApproveExpenseDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ApproveExpenseUseCase);
    const { id } = req.params;
    const { userId } = req.body;
    const result = await useCase.execute({ expenseId: Number(id), userId });
    return res.json(result);
  }
}

