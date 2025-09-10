import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  Body,
  Controller,
  Post,
  Tags,
  Description,
  CommonResponses,
} from '@/shared/http/docs/decorators';
import { CreateApartmentDTO } from '@/modules/apartments/domain/dtos/CreateApartmentDTO';
import { CreateApartmentUseCase } from './CreateApartmentUseCase';

@Tags('Apartments')
@Controller('apartments')
export class CreateApartmentController {
  @Post()
  @Description('Create a new apartment')
  @Body(CreateApartmentDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateApartmentUseCase);
    const apartment = await useCase.execute(req.body);
    return res.status(201).json(apartment);
  }
}
