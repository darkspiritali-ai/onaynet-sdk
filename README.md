# OnayNet Official SDK (Node.js, TypeScript & Python) — Non-VoIP Physical GSM SIM & SMS OTP Verification API v1

[![REST API v1](https://img.shields.io/badge/OnayNet-REST_API_v1-10b981)](https://onaynet.co/en/api-docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js >= 18](https://img.shields.io/badge/Node.js-%3E%3D18.0-339933)](https://onaynet.co/en/api-docs)
[![Python >= 3.8](https://img.shields.io/badge/Python-%3E%3D3.8-3776ab)](https://onaynet.co/en/api-docs)

Official **zero-dependency** Node.js / TypeScript and Python SDK for the **[OnayNet Non-VoIP SMS Verification & Physical GSM SIM REST API v1](https://onaynet.co/en/api-docs)** ([Türkçe API Dokümantasyonu](https://onaynet.co/tr/api-docs)).

Programmatically allocate single-tenant, unrecycled **ITU-T E.164 physical MNO SIM phone numbers** across **190+ countries**—including **US (`+1` AT&T, T-Mobile US, Verizon)**, **UK (`+44` Vodafone, O2, EE)**, **Germany (`+49`)**, **Netherlands (`+31`)**, and **Turkey (`+90` Turkcell, Vodafone TR, Türk Telekom)**—and retrieve 4-to-8 digit SMS OTP verification codes in real time (`2.1s` median SS7/SMPP latency) with **100% automatic atomic wallet refund** if no SMS arrives.

---

## Why Physical GSM SIM (Non-VoIP) Matters for QA & Automation

Modern identity providers (**Auth0**, **Arkose Labs**, **Twilio Lookup**, **Telesign**, **Live NationVerified Fan**, **MatchAuth**) perform real-time **HLR (Home Location Register)** and **NPAC / LRN** carrier lookups. Virtual VoIP numbers are rejected with `VoIP or landline detected` errors.

OnayNet routes directly over physical MNO SIM cards with genuine **MCC/MNC** carrier profiles and full **US FCC 10DLC & 5/6-digit domestic shortcode** (`72000`, `86753`, `22395`) termination:

| Service / Platform | Service Code | Primary Corridor | Typical OTP Sender ID | Live Verification Portal & Specs |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI & ChatGPT** | `openai` | USA (`+1`), UK (`+44`), DE (`+49`) | `OpenAI`, `Auth0` | [OpenAI Non-VoIP SMS Verification](https://onaynet.co/en/sms-verification/openai) |
| **Claude AI (Anthropic)** | `claude` | USA (`+1`), UK (`+44`), NL (`+31`) | `Anthropic`, `Claude` | [Claude AI Phone Verification](https://onaynet.co/en/sms-verification/claude) |
| **Ticketmaster** | `ticketmaster` | USA (`+1` `187`), UK (`+44` `16`) | `72000`, `TM-Verify` | [Ticketmaster Verified Fan Non-VoIP SMS](https://onaynet.co/en/sms-verification/ticketmaster) |
| **WhatsApp & Business** | `whatsapp` | 190+ Countries (`+1`, `+44`, `+90`) | `WhatsApp` (SMS & Voice) | [WhatsApp Virtual Number](https://onaynet.co/en/sms-verification/whatsapp) · [TR WhatsApp Onay](https://onaynet.co/tr/sms-onay/whatsapp) |
| **Telegram** | `telegram` | 190+ Countries (`+1`, `+44`, `+31`) | `Telegram` | [Telegram SMS Verification](https://onaynet.co/en/sms-verification/telegram) · [TR Telegram Onay](https://onaynet.co/tr/sms-onay/telegram) |
| **Tinder & Bumble** | `tinder` / `bumble` | USA (`+1`), UK (`+44`), EU | `Tinder`, `MatchAuth`, `Bumble` | [Tinder Non-VoIP Number](https://onaynet.co/en/sms-verification/tinder) · [Bumble SMS Verification](https://onaynet.co/en/sms-verification/bumble) |
| **Venmo & Cash App** | `venmo` / `cashapp` | USA (`+1` Tier-1 MNO) | `86753`, `Venmo`, `CashApp` | [Venmo US Non-VoIP SIM](https://onaynet.co/en/sms-verification/venmo) · [Cash App SMS Verification](https://onaynet.co/en/sms-verification/cashapp) |
| **Coinbase & PayPal** | `coinbase` / `paypal` | USA (`+1`), UK (`+44`), EU | `Coinbase`, `PayPal` | [Coinbase 2FA Non-VoIP SIM](https://onaynet.co/en/sms-verification/coinbase) · [PayPal SMS Verification](https://onaynet.co/en/sms-verification/paypal) |
| **Google / Gmail** | `google` | USA (`+1`), NL (`+31`), DE (`+49`) | `G-XXXXXX`, `Google` | [Google / Gmail SMS Verification](https://onaynet.co/en/sms-verification/google) · [TR Google SMS Onay](https://onaynet.co/tr/sms-onay/google) |
| **Trendyol & Getir** | `trendyol` / `getir` | Turkey (`+90` MCC 286) | `TRENDYOL`, `GETIR` | [Trendyol SMS Onay (+90)](https://onaynet.co/tr/sms-onay/trendyol) · [Getir SMS Onay](https://onaynet.co/tr/sms-onay/getir) |

---

## Popular Country Corridors (`country` ID Reference)

| Country Corridor | API `country` ID | Dial Code | MCC / MNC Physical Carriers | Direct Corridor Page |
| :--- | :--- | :--- | :--- | :--- |
| **United States (USA)** | `"187"` | `+1` (NANP) | `310-410` AT&T, `310-260` T-Mobile US, `311-480` Verizon | [US (+1) Non-VoIP Virtual Number](https://onaynet.co/en/virtual-number/usa) |
| **United Kingdom (UK)** | `"16"` | `+44` | `234-15` Vodafone UK, `234-10` O2, `234-30` EE | [UK (+44) Virtual Number](https://onaynet.co/en/virtual-number/uk) |
| **Germany** | `"43"` | `+49` | `262-01` Telekom DE, `262-02` Vodafone DE, `262-03` O2 | [Germany (+49) Virtual Number](https://onaynet.co/en/virtual-number/germany) |
| **Netherlands** | `"48"` | `+31` | `204-08` KPN, `204-04` Vodafone NL, `204-16` Odido | [Netherlands (+31) Virtual Number](https://onaynet.co/en/virtual-number/netherlands) |
| **Turkey (Türkiye)** | `"62"` | `+90` | `286-01` Turkcell, `286-02` Vodafone TR, `286-03` Türk Telekom | [Türkiye (+90) Sanal Numara](https://onaynet.co/tr/ulke/turkiye-sanal-numara) · [EN Turkey Number](https://onaynet.co/en/virtual-number/turkey) |
| **Canada** | `"36"` | `+1` (NANP) | `302-720` Rogers, `302-610` Bell, `302-220` Telus | [Canada (+1) Virtual Number](https://onaynet.co/en/virtual-number/canada) |

---

## Quickstart — Node.js / TypeScript (18+)

### 1. Generate Your API Key
Sign in to [https://onaynet.co/en/profile](https://onaynet.co/en/profile) (or [https://onaynet.co/tr/profile](https://onaynet.co/tr/profile)) and generate your `onay_live_...` secret token.

### 2. Allocate a US (`+1`) Physical SIM & Wait for OTP
```javascript
import { OnayNetClient } from 'onaynet-sdk';

const client = new OnayNetClient({
  apiKey: process.env.ONAYNET_API_KEY || 'onay_live_your_api_key_here'
});

async function runVerification() {
  // 1. Check wallet balance
  const { balance } = await client.getBalance();
  console.log(`Current Wallet Balance: $${balance} USD`);

  // 2. Allocate a US (+1, country="187") physical SIM number for OpenAI / Ticketmaster
  const order = await client.buyNumber({
    service: 'openai',
    country: '187'
  });
  console.log(`Allocated E.164 Number: ${order.phone_number} (Order #${order.order_id})`);

  // 3. Poll every 3s until the 6-digit OTP arrives (auto-cancels & 100% refunds on timeout)
  const completed = await client.waitForOtp(order.order_id, {
    pollIntervalMs: 3000,
    timeoutMs: 120000,
    autoCancelOnTimeout: true
  });

  console.log(`Received OTP Code: ${completed.sms_code}`);
}

runVerification().catch(console.error);
```

---

## Quickstart — Python (3.8+, Zero Dependencies)

Copy [`python/onaynet.py`](./python/onaynet.py) into your project or automation pipeline:

```python
from python.onaynet import OnayNetClient

client = OnayNetClient(api_key="onay_live_your_api_key_here")

# 1. Allocate US (+1) Non-VoIP number for Ticketmaster / OpenAI / WhatsApp
order = client.buy_number(service="ticketmaster", country="187")
print(f"Allocated E.164 Number: {order['phone_number']} (Order #{order['order_id']})")

# 2. Poll live SS7/SMPP gateway for incoming OTP (100% auto-refund if unused)
result = client.wait_for_otp(order["order_id"], poll_interval_sec=3.0, timeout_sec=120.0)
print(f"Received OTP Code: {result['sms_code']}")
```

---

## Technical Troubleshooting & Non-VoIP Guides

- **English Technical Guides:**
  - [US (+1) Non-VoIP Phone Number Verification Guide (2026)](https://onaynet.co/en/guides/us-non-voip-phone-number-verification-guide)
  - [How to Fix OpenAI, ChatGPT & Claude "VoIP Number Detected" Error](https://onaynet.co/en/guides/openai-chatgpt-claude-phone-verification-fix)
  - [Tinder, Ticketmaster & WhatsApp Non-VoIP Shortcode SMS Guide](https://onaynet.co/en/guides/tinder-ticketmaster-whatsapp-non-voip-sms-guide)
- **Türkçe Teknik Sorun Giderme Rehberleri:**
  - [Trendyol Onay Kodu Gelmiyor Çözümü & +90 SMS Doğrulama Rehberi](https://onaynet.co/tr/rehber/trendyol-onay-kodu-gelmiyor-cozumu)
  - [WhatsApp Doğrulama Kodu Gelmiyor & 1 Saat Hatası Çözümü](https://onaynet.co/tr/rehber/whatsapp-dogrulama-kodu-gelmiyor-cozumu)
  - [Telegram SMS Kod Gelmiyor & Too Many Attempts Çözümü](https://onaynet.co/tr/rehber/telegram-sms-kod-gelmiyor-cozumu)
- **Full 30-Language REST API v1 Documentation:**
  - [English API Docs](https://onaynet.co/en/api-docs) · [Türkçe API Dokümantasyonu](https://onaynet.co/tr/api-docs) · [Deutsch API-Docs](https://onaynet.co/de/api-docs) · [Français API-Docs](https://onaynet.co/fr/api-docs) · [Español API-Docs](https://onaynet.co/es/api-docs) · [Русский API-Docs](https://onaynet.co/ru/api-docs)

---

## License

MIT © [OnayNet Telecom Engineering](https://onaynet.co)
