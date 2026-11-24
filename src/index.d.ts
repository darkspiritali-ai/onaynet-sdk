export interface OnayNetConfig {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface BuyNumberParams {
  service: string;
  country?: string | number;
  operator?: string;
}

export interface OnayNetOrder {
  order_id: number;
  service: string;
  country: string;
  phone_number: string;
  price: number;
  status: 'WAITING' | 'RECEIVED' | 'COMPLETED' | 'CANCELLED';
  sms_code: string | null;
  full_sms?: string | null;
  created_at?: string;
}

export interface WaitForOtpOptions {
  pollIntervalMs?: number;
  timeoutMs?: number;
  autoCancelOnTimeout?: boolean;
}

export class OnayNetError extends Error {
  status: number;
  code: string;
  details: unknown;
  constructor(message: string, status?: number, code?: string, details?: unknown);
}

export class OnayNetClient {
  apiKey: string;
  baseUrl: string;
  timeoutMs: number;
  constructor(config: OnayNetConfig);
  getBalance(): Promise<{ balance: number; currency: string; email: string }>;
  listCountries(): Promise<Array<{ id: string; name: string; dial_code: string }>>;
  listServices(country?: string | number): Promise<Array<{ service: string; name: string; price: number; count: number }>>;
  buyNumber(params: BuyNumberParams): Promise<OnayNetOrder>;
  getOrder(orderId: number | string): Promise<OnayNetOrder>;
  cancelOrder(orderId: number | string): Promise<{ order_id: number; status: 'CANCELLED'; refunded: boolean }>;
  finishOrder(orderId: number | string): Promise<{ order_id: number; status: 'COMPLETED' }>;
  waitForOtp(orderId: number | string, options?: WaitForOtpOptions): Promise<OnayNetOrder>;
}

export default OnayNetClient;
