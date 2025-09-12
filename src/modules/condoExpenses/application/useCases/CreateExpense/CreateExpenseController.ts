import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Post,
  Tags,
  CommonResponses,
  UseMiddleware,
  ApiResponse,
} from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { upload } from '@/shared/http/middlewares/uploadMiddleware';
import { CreateExpenseUseCase } from './CreateExpenseUseCase';
import { CreateExpenseDTO } from '@/modules/condoExpenses/domain/dtos/CreateExpenseDTO';
import { CondoExpenseResponseDTO } from '@/modules/condoExpenses/domain/dtos/CondoExpenseResponseDTO';

@Tags('CondoExpenses')
@Controller('condo-expenses')
export class CreateExpenseController {
  @Post()
  @Description('Cria uma nova despesa com comprovante opcional')
  @ApiResponse({
    statusCode: 201,
    description: 'Expense created successfully',
    dtoClass: CondoExpenseResponseDTO,
  })
  @Body(CreateExpenseDTO)
  @UseMiddleware(upload.single('receipt'))
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateExpenseUseCase);
    const { description, value, date, pixKey, approvalsRequired } = req.body;
    const receiptUrl = (req.file as any)?.location;
    const expense = await useCase.execute({
      description,
      value: Number(value),
      date: new Date(date),
      receiptUrl,
      pixKey,
      approvalsRequired: Number(approvalsRequired),
    });
    return res.status(201).json(expense);
  }
}

