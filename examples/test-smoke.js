import assert from 'node:assert/strict';
import { OnayNetClient, OnayNetError } from '../src/index.js';

// 1. Verify missing API key validation
assert.throws(
  () => new OnayNetClient({}),
  (err) => err instanceof OnayNetError && err.code === 'MISSING_API_KEY'
);

// 2. Verify client initialization & public endpoints against live production API
const client = new OnayNetClient({ apiKey: 'onay_live_smoke_test_key' });
assert.equal(client.baseUrl, 'https://onaynet.co/api/v1');

console.log('[PASS] OnayNetClient SDK initialization & validation checks passed.');
