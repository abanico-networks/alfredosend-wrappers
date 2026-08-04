# Cliente Node.js de Alfredo

Requiere Node.js 18 o posterior y usa `fetch` nativo.

```js
import { AlfredoClient } from '@alfredosend/client'

const alfredo = new AlfredoClient({
  apiKey: process.env.ALFREDO_API_KEY,
  clientId: process.env.ALFREDO_CLIENT_ID,
})

await alfredo.sendTransactional(process.env.ALFREDO_TEMPLATE_ID, {
  to: [{ email: 'cliente@example.com', name: 'Cliente' }],
  data: { name: 'Cliente' },
})
```

Alfredo crea una clave de idempotencia si no se proporciona. Para reintentos deliberados, pasa `{ idempotencyKey: 'pedido-1042' }` como tercer argumento.
