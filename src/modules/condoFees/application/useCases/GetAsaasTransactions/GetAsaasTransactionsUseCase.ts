import { injectable } from 'tsyringe';

import { AsaasClient } from '@/shared/providers/asaas/AsaasClient';

@injectable()
export class GetAsaasTransactionsUseCase {
  async execute() {
    const client = new AsaasClient();
    return client.getTransactions();
  }
}
