import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Controller, Post, Tags, ApiResponse } from '@/shared/http/docs/decorators';
import { Description } from '@/shared/http/docs/decorators/Description';
import { UpdateFeeStatusUseCase } from './UpdateFeeStatusUseCase';

@Tags('Asaas')
@Controller('asaas')
export class AsaasWebhookController {
  @Post('webhook')
  @Description('Recebe notificações de pagamento do Asaas')
  @ApiResponse({
    statusCode: 200,
    description: 'Webhook recebido',
  })
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

