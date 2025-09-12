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
import { CreateApartmentDTO } from '@/modules/apartments/domain/dtos/CreateApartmentDTO';
import { ApartmentResponseDTO } from '@/modules/apartments/domain/dtos/ApartmentResponseDTO';
import { CreateApartmentUseCase } from './CreateApartmentUseCase';

@Tags('Apartments')
@Controller('apartments')
export class CreateApartmentController {
  @Post()
  @Description('Create a new apartment')
  @ApiResponse({
    statusCode: 201,
    description: 'Apartment created successfully',
    dtoClass: ApartmentResponseDTO,
  })
  @Body(CreateApartmentDTO)
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CreateApartmentUseCase);
    const apartment = await useCase.execute(req.body);
    return res.status(201).json(apartment);
  }
}

