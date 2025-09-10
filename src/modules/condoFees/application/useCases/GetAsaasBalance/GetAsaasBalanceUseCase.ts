import { injectable } from 'tsyringe';

import { AsaasClient } from '@/shared/providers/asaas/AsaasClient';

@injectable()
export class GetAsaasBalanceUseCase {
  async execute() {
    const client = new AsaasClient();
    return client.getAccountBalance();
  }
}
