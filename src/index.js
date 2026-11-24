/**
 * Official OnayNet REST API v1 Client (Node.js 18+ / TypeScript / Edge Runtime)
 * Zero external dependencies — uses native fetch.
 *
 * Documentation: https://onaynet.co/en/api-docs
 * Turkish Docs:  https://onaynet.co/tr/api-docs
 */

export class OnayNetError extends Error {
  constructor(message, status = 0, code = 'ONAYNET_API_ERROR', details = null) {
    super(message);
    this.name = 'OnayNetError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class OnayNetClient {
  /**
   * @param {object} config
   * @param {string} config.apiKey - Your OnayNet secret key (starts with `onay_live_...`)
   * @param {string} [config.baseUrl="https://onaynet.co/api/v1"] - REST API v1 base URL
   * @param {number} [config.timeoutMs=15000] - Request timeout in milliseconds
   */
  constructor({ apiKey, baseUrl = 'https://onaynet.co/api/v1', timeoutMs = 15000 } = {}) {
    if (!apiKey || typeof apiKey !== 'string') {
      throw new OnayNetError(
        'An OnayNet API key (onay_live_...) is required. Generate one at https://onaynet.co/en/profile',
        401,
        'MISSING_API_KEY'
      );
    }
    this.apiKey = apiKey.trim();
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.timeoutMs = timeoutMs;
  }

  async _request(method, path, body = undefined) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Key': this.apiKey,
        'Accept': 'application/json',
        'User-Agent': 'onaynet-sdk-nodejs/1.0.0 (+https://onaynet.co/en/api-docs)'
      };
      if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || (payload && payload.success === false)) {
        const msg = payload?.error || payload?.message || `HTTP ${response.status} on ${method} ${path}`;
        throw new OnayNetError(msg, response.status, payload?.code || 'API_REQUEST_FAILED', payload);
      }

      return payload?.data !== undefined ? payload.data : payload;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Returns current wallet balance, account email, and currency denomination (USD).
   * Endpoint: GET /api/v1/balance
   */
  async getBalance() {
    return this._request('GET', '/balance');
  }

  /**
   * Lists all 190+ supported physical GSM SIM country corridors (e.g. "187" for USA, "16" for UK, "62" for Turkey).
   * Endpoint: GET /api/v1/countries
   */
  async listCountries() {
    return this._request('GET', '/countries');
  }

  /**
   * Lists real-time physical SIM inventory, prices, and service slugs for a country.
   * Endpoint: GET /api/v1/services?country=187
   *
   * @param {string|number} [country="187"] - Country code (default "187" for USA +1)
   */
  async listServices(country = '187') {
    const query = country ? `?country=${encodeURIComponent(String(country))}` : '';
    return this._request('GET', `/services${query}`);
  }

  /**
   * Allocates a dedicated single-tenant Non-VoIP E.164 phone number.
   * Endpoint: POST /api/v1/orders/buy
   *
   * @param {object} params
   * @param {string} params.service - Service code (e.g. "openai", "whatsapp", "ticketmaster", "tinder", "venmo")
   * @param {string|number} [params.country="187"] - Country ID (e.g. "187" USA, "16" UK, "43" Germany, "62" Turkey)
   * @param {string} [params.operator="any"] - Specific MNO carrier or "any"
   */
  async buyNumber({ service, country = '187', operator = 'any' }) {
    if (!service) {
      throw new OnayNetError('Parameter "service" is required (e.g. "openai", "whatsapp")', 400, 'INVALID_PARAMS');
    }
    return this._request('POST', '/orders/buy', {
      service: String(service).toLowerCase(),
      country: String(country),
      operator
    });
  }

  /**
   * Polls live SS7/SMPP gateway for incoming SMS and returns parsed 4-to-8 digit `sms_code` and `status`.
   * Endpoint: GET /api/v1/orders/:id
   *
   * @param {number|string} orderId
   */
  async getOrder(orderId) {
    return this._request('GET', `/orders/${encodeURIComponent(String(orderId))}`);
  }

  /**
   * Cancels an active order where no SMS has arrived and triggers an instant 100% atomic refund to wallet balance.
   * Endpoint: POST /api/v1/orders/:id/cancel
   *
   * @param {number|string} orderId
   */
  async cancelOrder(orderId) {
    return this._request('POST', `/orders/${encodeURIComponent(String(orderId))}/cancel`);
  }

  /**
   * Marks an order that already received an SMS code as completed and releases the physical SIM port.
   * Endpoint: POST /api/v1/orders/:id/finish
   *
   * @param {number|string} orderId
   */
  async finishOrder(orderId) {
    return this._request('POST', `/orders/${encodeURIComponent(String(orderId))}/finish`);
  }

  /**
   * High-level helper: Polls an active order until `sms_code` arrives, or automatically cancels & refunds on timeout.
   *
   * @param {number|string} orderId - Allocated order ID
   * @param {object} [options]
   * @param {number} [options.pollIntervalMs=3000] - Interval between polls in ms
   * @param {number} [options.timeoutMs=120000] - Max wait time before optional auto-cancel
   * @param {boolean} [options.autoCancelOnTimeout=true] - Automatically refund if no SMS arrives in time
   */
  async waitForOtp(orderId, { pollIntervalMs = 3000, timeoutMs = 120000, autoCancelOnTimeout = true } = {}) {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const state = await this.getOrder(orderId);
      if (state?.sms_code) {
        return state;
      }
      if (state?.status === 'CANCELLED' || state?.status === 'EXPIRED') {
        throw new OnayNetError(`Order #${orderId} ended with status ${state.status}`, 410, 'ORDER_CLOSED', state);
      }
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }

    if (autoCancelOnTimeout) {
      await this.cancelOrder(orderId).catch(() => null);
    }
    throw new OnayNetError(
      `OTP timeout after ${Math.round(timeoutMs / 1000)}s for order #${orderId} (autoCancel=${autoCancelOnTimeout})`,
      408,
      'OTP_TIMEOUT'
    );
  }
}

export default OnayNetClient;
