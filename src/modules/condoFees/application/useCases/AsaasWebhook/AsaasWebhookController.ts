import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Controller, Post, Tags } from '@/shared/http/docs/decorators';
import { UpdateFeeStatusUseCase } from './UpdateFeeStatusUseCase';

@Tags('Asaas')
@Controller('asaas')
export class AsaasWebhookController {
  @Post('webhook')
  async handle(req: Request, res: Response): Promise<Response> {
    const event = req.body?.event;
    if (event === 'PAYMENT_RECEIVED') {
      const external = req.body?.payment?.externalReference;
      if (external) {
        const useCase = container.resolve(UpdateFeeStatusUseCase);
        await useCase.execute(external);
      }
    }
    return res.status(200).send();
  }
}
