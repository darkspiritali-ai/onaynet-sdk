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


---

## Complete 30-Language Global Localization & Regional Telecom Portals

OnayNet provides native server-side rendered (SSR) telecom documentation, localized REST API v1 references, and physical GSM SIM allocation portals across **30 languages**:

| Language / Locale | Regional Console | REST API v1 Docs | Popular Non-VoIP Service Portals | Physical MNO Country Corridors |
| :--- | :--- | :--- | :--- | :--- |
| **Türkçe (Turkish)** (`tr`) | [OnayNet TR](https://onaynet.co/tr) | [Geliştirici REST API v1](https://onaynet.co/tr/api-docs) | [WhatsApp](https://onaynet.co/tr/sms-onay/whatsapp) · [OpenAI](https://onaynet.co/tr/sms-onay/openai) · [Ticketmaster](https://onaynet.co/tr/sms-onay/ticketmaster) · [Telegram](https://onaynet.co/tr/sms-onay/telegram) · [Tinder](https://onaynet.co/tr/sms-onay/tinder) | [USA (+1)](https://onaynet.co/tr/ulke/abd-sanal-numara) · [UK (+44)](https://onaynet.co/tr/ulke/ingiltere-sanal-numara) · [DE (+49)](https://onaynet.co/tr/ulke/almanya-sanal-numara) |
| **English (US / Global)** (`en`) | [OnayNet EN](https://onaynet.co/en) | [Developer REST API v1](https://onaynet.co/en/api-docs) | [WhatsApp](https://onaynet.co/en/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/en/sms-verification/openai) · [Ticketmaster](https://onaynet.co/en/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/en/sms-verification/telegram) · [Tinder](https://onaynet.co/en/sms-verification/tinder) | [USA (+1)](https://onaynet.co/en/virtual-number/usa) · [UK (+44)](https://onaynet.co/en/virtual-number/uk) · [DE (+49)](https://onaynet.co/en/virtual-number/germany) |
| **Deutsch (German)** (`de`) | [OnayNet DE](https://onaynet.co/de) | [Entwickler REST API v1](https://onaynet.co/de/api-docs) | [WhatsApp](https://onaynet.co/de/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/de/sms-verification/openai) · [Ticketmaster](https://onaynet.co/de/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/de/sms-verification/telegram) · [Tinder](https://onaynet.co/de/sms-verification/tinder) | [USA (+1)](https://onaynet.co/de/virtual-number/usa) · [UK (+44)](https://onaynet.co/de/virtual-number/uk) · [DE (+49)](https://onaynet.co/de/virtual-number/germany) |
| **Français (French)** (`fr`) | [OnayNet FR](https://onaynet.co/fr) | [API REST Développeur v1](https://onaynet.co/fr/api-docs) | [WhatsApp](https://onaynet.co/fr/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/fr/sms-verification/openai) · [Ticketmaster](https://onaynet.co/fr/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/fr/sms-verification/telegram) · [Tinder](https://onaynet.co/fr/sms-verification/tinder) | [USA (+1)](https://onaynet.co/fr/virtual-number/usa) · [UK (+44)](https://onaynet.co/fr/virtual-number/uk) · [DE (+49)](https://onaynet.co/fr/virtual-number/germany) |
| **Español (Spanish)** (`es`) | [OnayNet ES](https://onaynet.co/es) | [API REST para Desarrolladores v1](https://onaynet.co/es/api-docs) | [WhatsApp](https://onaynet.co/es/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/es/sms-verification/openai) · [Ticketmaster](https://onaynet.co/es/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/es/sms-verification/telegram) · [Tinder](https://onaynet.co/es/sms-verification/tinder) | [USA (+1)](https://onaynet.co/es/virtual-number/usa) · [UK (+44)](https://onaynet.co/es/virtual-number/uk) · [DE (+49)](https://onaynet.co/es/virtual-number/germany) |
| **Italiano (Italian)** (`it`) | [OnayNet IT](https://onaynet.co/it) | [API REST Sviluppatori v1](https://onaynet.co/it/api-docs) | [WhatsApp](https://onaynet.co/it/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/it/sms-verification/openai) · [Ticketmaster](https://onaynet.co/it/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/it/sms-verification/telegram) · [Tinder](https://onaynet.co/it/sms-verification/tinder) | [USA (+1)](https://onaynet.co/it/virtual-number/usa) · [UK (+44)](https://onaynet.co/it/virtual-number/uk) · [DE (+49)](https://onaynet.co/it/virtual-number/germany) |
| **Русский (Russian)** (`ru`) | [OnayNet RU](https://onaynet.co/ru) | [Developer REST API v1](https://onaynet.co/ru/api-docs) | [WhatsApp](https://onaynet.co/ru/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/ru/sms-verification/openai) · [Ticketmaster](https://onaynet.co/ru/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/ru/sms-verification/telegram) · [Tinder](https://onaynet.co/ru/sms-verification/tinder) | [USA (+1)](https://onaynet.co/ru/virtual-number/usa) · [UK (+44)](https://onaynet.co/ru/virtual-number/uk) · [DE (+49)](https://onaynet.co/ru/virtual-number/germany) |
| **العربية (Arabic)** (`ar`) | [OnayNet AR](https://onaynet.co/ar) | [واجهة المطورين REST API v1](https://onaynet.co/ar/api-docs) | [WhatsApp](https://onaynet.co/ar/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/ar/sms-verification/openai) · [Ticketmaster](https://onaynet.co/ar/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/ar/sms-verification/telegram) · [Tinder](https://onaynet.co/ar/sms-verification/tinder) | [USA (+1)](https://onaynet.co/ar/virtual-number/usa) · [UK (+44)](https://onaynet.co/ar/virtual-number/uk) · [DE (+49)](https://onaynet.co/ar/virtual-number/germany) |
| **中文 (Chinese)** (`zh`) | [OnayNet ZH](https://onaynet.co/zh) | [开发者 REST API v1](https://onaynet.co/zh/api-docs) | [WhatsApp](https://onaynet.co/zh/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/zh/sms-verification/openai) · [Ticketmaster](https://onaynet.co/zh/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/zh/sms-verification/telegram) · [Tinder](https://onaynet.co/zh/sms-verification/tinder) | [USA (+1)](https://onaynet.co/zh/virtual-number/usa) · [UK (+44)](https://onaynet.co/zh/virtual-number/uk) · [DE (+49)](https://onaynet.co/zh/virtual-number/germany) |
| **Português (Portuguese)** (`pt`) | [OnayNet PT](https://onaynet.co/pt) | [API REST para Desenvolvedores v1](https://onaynet.co/pt/api-docs) | [WhatsApp](https://onaynet.co/pt/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/pt/sms-verification/openai) · [Ticketmaster](https://onaynet.co/pt/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/pt/sms-verification/telegram) · [Tinder](https://onaynet.co/pt/sms-verification/tinder) | [USA (+1)](https://onaynet.co/pt/virtual-number/usa) · [UK (+44)](https://onaynet.co/pt/virtual-number/uk) · [DE (+49)](https://onaynet.co/pt/virtual-number/germany) |
| **Nederlands (Dutch)** (`nl`) | [OnayNet NL](https://onaynet.co/nl) | [Developer REST API v1](https://onaynet.co/nl/api-docs) | [WhatsApp](https://onaynet.co/nl/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/nl/sms-verification/openai) · [Ticketmaster](https://onaynet.co/nl/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/nl/sms-verification/telegram) · [Tinder](https://onaynet.co/nl/sms-verification/tinder) | [USA (+1)](https://onaynet.co/nl/virtual-number/usa) · [UK (+44)](https://onaynet.co/nl/virtual-number/uk) · [DE (+49)](https://onaynet.co/nl/virtual-number/germany) |
| **日本語 (Japanese)** (`ja`) | [OnayNet JA](https://onaynet.co/ja) | [開発者 REST API v1](https://onaynet.co/ja/api-docs) | [WhatsApp](https://onaynet.co/ja/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/ja/sms-verification/openai) · [Ticketmaster](https://onaynet.co/ja/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/ja/sms-verification/telegram) · [Tinder](https://onaynet.co/ja/sms-verification/tinder) | [USA (+1)](https://onaynet.co/ja/virtual-number/usa) · [UK (+44)](https://onaynet.co/ja/virtual-number/uk) · [DE (+49)](https://onaynet.co/ja/virtual-number/germany) |
| **한국어 (Korean)** (`ko`) | [OnayNet KO](https://onaynet.co/ko) | [개발자 REST API v1](https://onaynet.co/ko/api-docs) | [WhatsApp](https://onaynet.co/ko/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/ko/sms-verification/openai) · [Ticketmaster](https://onaynet.co/ko/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/ko/sms-verification/telegram) · [Tinder](https://onaynet.co/ko/sms-verification/tinder) | [USA (+1)](https://onaynet.co/ko/virtual-number/usa) · [UK (+44)](https://onaynet.co/ko/virtual-number/uk) · [DE (+49)](https://onaynet.co/ko/virtual-number/germany) |
| **فارسی (Persian)** (`fa`) | [OnayNet FA](https://onaynet.co/fa) | [REST API v1 توسعه‌دهندگان](https://onaynet.co/fa/api-docs) | [WhatsApp](https://onaynet.co/fa/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/fa/sms-verification/openai) · [Ticketmaster](https://onaynet.co/fa/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/fa/sms-verification/telegram) · [Tinder](https://onaynet.co/fa/sms-verification/tinder) | [USA (+1)](https://onaynet.co/fa/virtual-number/usa) · [UK (+44)](https://onaynet.co/fa/virtual-number/uk) · [DE (+49)](https://onaynet.co/fa/virtual-number/germany) |
| **Azərbaycan (Azerbaijani)** (`az`) | [OnayNet AZ](https://onaynet.co/az) | [Tərtibatçı REST API v1](https://onaynet.co/az/api-docs) | [WhatsApp](https://onaynet.co/az/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/az/sms-verification/openai) · [Ticketmaster](https://onaynet.co/az/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/az/sms-verification/telegram) · [Tinder](https://onaynet.co/az/sms-verification/tinder) | [USA (+1)](https://onaynet.co/az/virtual-number/usa) · [UK (+44)](https://onaynet.co/az/virtual-number/uk) · [DE (+49)](https://onaynet.co/az/virtual-number/germany) |
| **Українська (Ukrainian)** (`uk`) | [OnayNet UK](https://onaynet.co/uk) | [Developer REST API v1](https://onaynet.co/uk/api-docs) | [WhatsApp](https://onaynet.co/uk/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/uk/sms-verification/openai) · [Ticketmaster](https://onaynet.co/uk/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/uk/sms-verification/telegram) · [Tinder](https://onaynet.co/uk/sms-verification/tinder) | [USA (+1)](https://onaynet.co/uk/virtual-number/usa) · [UK (+44)](https://onaynet.co/uk/virtual-number/uk) · [DE (+49)](https://onaynet.co/uk/virtual-number/germany) |
| **Polski (Polish)** (`pl`) | [OnayNet PL](https://onaynet.co/pl) | [Developer REST API v1](https://onaynet.co/pl/api-docs) | [WhatsApp](https://onaynet.co/pl/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/pl/sms-verification/openai) · [Ticketmaster](https://onaynet.co/pl/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/pl/sms-verification/telegram) · [Tinder](https://onaynet.co/pl/sms-verification/tinder) | [USA (+1)](https://onaynet.co/pl/virtual-number/usa) · [UK (+44)](https://onaynet.co/pl/virtual-number/uk) · [DE (+49)](https://onaynet.co/pl/virtual-number/germany) |
| **Română (Romanian)** (`ro`) | [OnayNet RO](https://onaynet.co/ro) | [Developer REST API v1](https://onaynet.co/ro/api-docs) | [WhatsApp](https://onaynet.co/ro/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/ro/sms-verification/openai) · [Ticketmaster](https://onaynet.co/ro/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/ro/sms-verification/telegram) · [Tinder](https://onaynet.co/ro/sms-verification/tinder) | [USA (+1)](https://onaynet.co/ro/virtual-number/usa) · [UK (+44)](https://onaynet.co/ro/virtual-number/uk) · [DE (+49)](https://onaynet.co/ro/virtual-number/germany) |
| **Български (Bulgarian)** (`bg`) | [OnayNet BG](https://onaynet.co/bg) | [Developer REST API v1](https://onaynet.co/bg/api-docs) | [WhatsApp](https://onaynet.co/bg/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/bg/sms-verification/openai) · [Ticketmaster](https://onaynet.co/bg/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/bg/sms-verification/telegram) · [Tinder](https://onaynet.co/bg/sms-verification/tinder) | [USA (+1)](https://onaynet.co/bg/virtual-number/usa) · [UK (+44)](https://onaynet.co/bg/virtual-number/uk) · [DE (+49)](https://onaynet.co/bg/virtual-number/germany) |
| **Ελληνικά (Greek)** (`el`) | [OnayNet EL](https://onaynet.co/el) | [Developer REST API v1](https://onaynet.co/el/api-docs) | [WhatsApp](https://onaynet.co/el/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/el/sms-verification/openai) · [Ticketmaster](https://onaynet.co/el/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/el/sms-verification/telegram) · [Tinder](https://onaynet.co/el/sms-verification/tinder) | [USA (+1)](https://onaynet.co/el/virtual-number/usa) · [UK (+44)](https://onaynet.co/el/virtual-number/uk) · [DE (+49)](https://onaynet.co/el/virtual-number/germany) |
| **हिन्दी (Hindi)** (`hi`) | [OnayNet HI](https://onaynet.co/hi) | [डेवलपर REST API v1](https://onaynet.co/hi/api-docs) | [WhatsApp](https://onaynet.co/hi/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/hi/sms-verification/openai) · [Ticketmaster](https://onaynet.co/hi/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/hi/sms-verification/telegram) · [Tinder](https://onaynet.co/hi/sms-verification/tinder) | [USA (+1)](https://onaynet.co/hi/virtual-number/usa) · [UK (+44)](https://onaynet.co/hi/virtual-number/uk) · [DE (+49)](https://onaynet.co/hi/virtual-number/germany) |
| **Bahasa Indonesia (Indonesian)** (`id`) | [OnayNet ID](https://onaynet.co/id) | [Developer REST API v1](https://onaynet.co/id/api-docs) | [WhatsApp](https://onaynet.co/id/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/id/sms-verification/openai) · [Ticketmaster](https://onaynet.co/id/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/id/sms-verification/telegram) · [Tinder](https://onaynet.co/id/sms-verification/tinder) | [USA (+1)](https://onaynet.co/id/virtual-number/usa) · [UK (+44)](https://onaynet.co/id/virtual-number/uk) · [DE (+49)](https://onaynet.co/id/virtual-number/germany) |
| **Tiếng Việt (Vietnamese)** (`vi`) | [OnayNet VI](https://onaynet.co/vi) | [Developer REST API v1](https://onaynet.co/vi/api-docs) | [WhatsApp](https://onaynet.co/vi/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/vi/sms-verification/openai) · [Ticketmaster](https://onaynet.co/vi/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/vi/sms-verification/telegram) · [Tinder](https://onaynet.co/vi/sms-verification/tinder) | [USA (+1)](https://onaynet.co/vi/virtual-number/usa) · [UK (+44)](https://onaynet.co/vi/virtual-number/uk) · [DE (+49)](https://onaynet.co/vi/virtual-number/germany) |
| **ไทย (Thai)** (`th`) | [OnayNet TH](https://onaynet.co/th) | [Developer REST API v1](https://onaynet.co/th/api-docs) | [WhatsApp](https://onaynet.co/th/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/th/sms-verification/openai) · [Ticketmaster](https://onaynet.co/th/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/th/sms-verification/telegram) · [Tinder](https://onaynet.co/th/sms-verification/tinder) | [USA (+1)](https://onaynet.co/th/virtual-number/usa) · [UK (+44)](https://onaynet.co/th/virtual-number/uk) · [DE (+49)](https://onaynet.co/th/virtual-number/germany) |
| **Svenska (Swedish)** (`sv`) | [OnayNet SV](https://onaynet.co/sv) | [API-dokumentation](https://onaynet.co/sv/api-docs) | [WhatsApp](https://onaynet.co/sv/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/sv/sms-verification/openai) · [Ticketmaster](https://onaynet.co/sv/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/sv/sms-verification/telegram) · [Tinder](https://onaynet.co/sv/sms-verification/tinder) | [USA (+1)](https://onaynet.co/sv/virtual-number/usa) · [UK (+44)](https://onaynet.co/sv/virtual-number/uk) · [DE (+49)](https://onaynet.co/sv/virtual-number/germany) |
| **Norsk (Norwegian)** (`no`) | [OnayNet NO](https://onaynet.co/no) | [API-dokumentasjon](https://onaynet.co/no/api-docs) | [WhatsApp](https://onaynet.co/no/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/no/sms-verification/openai) · [Ticketmaster](https://onaynet.co/no/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/no/sms-verification/telegram) · [Tinder](https://onaynet.co/no/sms-verification/tinder) | [USA (+1)](https://onaynet.co/no/virtual-number/usa) · [UK (+44)](https://onaynet.co/no/virtual-number/uk) · [DE (+49)](https://onaynet.co/no/virtual-number/germany) |
| **Dansk (Danish)** (`da`) | [OnayNet DA](https://onaynet.co/da) | [API-dokumentation](https://onaynet.co/da/api-docs) | [WhatsApp](https://onaynet.co/da/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/da/sms-verification/openai) · [Ticketmaster](https://onaynet.co/da/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/da/sms-verification/telegram) · [Tinder](https://onaynet.co/da/sms-verification/tinder) | [USA (+1)](https://onaynet.co/da/virtual-number/usa) · [UK (+44)](https://onaynet.co/da/virtual-number/uk) · [DE (+49)](https://onaynet.co/da/virtual-number/germany) |
| **Suomi (Finnish)** (`fi`) | [OnayNet FI](https://onaynet.co/fi) | [API-dokumentaatio](https://onaynet.co/fi/api-docs) | [WhatsApp](https://onaynet.co/fi/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/fi/sms-verification/openai) · [Ticketmaster](https://onaynet.co/fi/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/fi/sms-verification/telegram) · [Tinder](https://onaynet.co/fi/sms-verification/tinder) | [USA (+1)](https://onaynet.co/fi/virtual-number/usa) · [UK (+44)](https://onaynet.co/fi/virtual-number/uk) · [DE (+49)](https://onaynet.co/fi/virtual-number/germany) |
| **עברית (Hebrew)** (`he`) | [OnayNet HE](https://onaynet.co/he) | [Developer REST API v1](https://onaynet.co/he/api-docs) | [WhatsApp](https://onaynet.co/he/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/he/sms-verification/openai) · [Ticketmaster](https://onaynet.co/he/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/he/sms-verification/telegram) · [Tinder](https://onaynet.co/he/sms-verification/tinder) | [USA (+1)](https://onaynet.co/he/virtual-number/usa) · [UK (+44)](https://onaynet.co/he/virtual-number/uk) · [DE (+49)](https://onaynet.co/he/virtual-number/germany) |
| **ქართული (Georgian)** (`ka`) | [OnayNet KA](https://onaynet.co/ka) | [API დოკუმენტაცია](https://onaynet.co/ka/api-docs) | [WhatsApp](https://onaynet.co/ka/sms-verification/whatsapp) · [OpenAI](https://onaynet.co/ka/sms-verification/openai) · [Ticketmaster](https://onaynet.co/ka/sms-verification/ticketmaster) · [Telegram](https://onaynet.co/ka/sms-verification/telegram) · [Tinder](https://onaynet.co/ka/sms-verification/tinder) | [USA (+1)](https://onaynet.co/ka/virtual-number/usa) · [UK (+44)](https://onaynet.co/ka/virtual-number/uk) · [DE (+49)](https://onaynet.co/ka/virtual-number/germany) |

## License

MIT © [OnayNet Telecom Engineering](https://onaynet.co)
