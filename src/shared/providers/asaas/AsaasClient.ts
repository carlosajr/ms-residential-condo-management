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

interface AsaasPixPayRequest {
  pixKey: string;
  value: number;
  description?: string;
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

  async getAccountBalance(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/finance/balance`, {
      method: 'GET',
      headers: {
        access_token: this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch balance from Asaas');
    }

    return response.json();
  }

  async getTransactions(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/financialTransactions`, {
      method: 'GET',
      headers: {
        access_token: this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions from Asaas');
    }

    return response.json();
  }

  async payPix(data: AsaasPixPayRequest): Promise<any> {
    const response = await fetch(`${this.baseUrl}/pix/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: this.apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to pay PIX on Asaas');
    }

    return response.json();
  }
}
