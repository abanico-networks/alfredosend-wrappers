import assert from 'node:assert/strict'
import test from 'node:test'
import { AlfredoClient } from './alfredo.js'

test('sends the documented request without an idempotency header by default', async () => {
  const originalFetch = globalThis.fetch
  let request
  globalThis.fetch = async (url, options) => {
    request = { url, options }
    return new Response(JSON.stringify({ accepted: true }), { status: 202 })
  }

  try {
    const client = new AlfredoClient({ apiKey: 'test-key', clientId: 'client-1', baseUrl: 'https://api.example.test/' })
    assert.deepEqual(await client.sendTransactional('template-1', { to: [{ email: 'cliente@example.com' }] }), { accepted: true })
    assert.equal(request.url, 'https://api.example.test/v1/clients/client-1/transactional/templates/template-1/send')
    assert.equal(request.options.headers['Idempotency-Key'], undefined)
  } finally {
    globalThis.fetch = originalFetch
  }
})
