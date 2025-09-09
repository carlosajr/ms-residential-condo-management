import 'dotenv/config';

interface AsaasPaymentRequest {
  customer: string;
  billingType: 'PIX';
  value: number;
  description?: string;
  externalReference?: string;
}

interface AsaasPaymentResponse {
  id: string;
  status: string;
  value: number;
  pixQrCode?: {
    encodedImage: string;
    payload: string;
  };
}

export class AsaasClient {
  private baseUrl = process.env.ASAAS_API_URL || 'https://api.asaas.com/v3';
  private apiKey = process.env.ASAAS_API_KEY || '';

  async createPayment(
    data: AsaasPaymentRequest,
  ): Promise<AsaasPaymentResponse> {
    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: this.apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment on Asaas');
    }

    return response.json();
  }
}
