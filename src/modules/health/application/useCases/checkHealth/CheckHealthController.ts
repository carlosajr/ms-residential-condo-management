import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Controller, Get, Tags, ApiResponse, CommonResponses } from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { CheckHealthUseCase } from './CheckHealthUseCase';
import { HealthCheckResponseDTO } from '@/modules/health/domain/dtos/HealthCheckResponseDTO';

@Tags('Health')
@Controller('/')
export class CheckHealthController {
  @Get('health')
  @Description('Service health check')
  @ApiResponse({
    statusCode: 200,
    description: 'Serviço saudável',
    dtoClass: HealthCheckResponseDTO,
  })
  @CommonResponses()
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(CheckHealthUseCase);
    const result = await useCase.execute();
    return res.json(result);
  }
}

