export class AlfredoClient {
  constructor({ apiKey, clientId, baseUrl = 'https://api.alfredosend.com' }) {
    if (!apiKey || !clientId) throw new Error('apiKey y clientId son obligatorios.')
    this.apiKey = apiKey
    this.clientId = clientId
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  async sendTransactional(templateId, payload, { idempotencyKey } = {}) {
    const response = await fetch(`${this.baseUrl}/v1/clients/${this.clientId}/transactional/templates/${templateId}/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      },
      body: JSON.stringify(payload),
    })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(body.message || `Alfredo respondió ${response.status}.`)
    return body
  }
}
