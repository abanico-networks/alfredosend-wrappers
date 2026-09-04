# Wrappers de Alfredo

Clientes ligeros para disparar emails transaccionales. Cada carpeta es un paquete independiente: Node.js (`@abanico-networks/alfredosend-client`), PHP (`alfredosend/client`), Ruby (`alfredosend`) y Laravel (`alfredosend/laravel`).

Cada wrapper recibe `apiKey`, `clientId` y `templateId`. La integración normal no requiere una cabecera `Idempotency-Key`: Alfredo crea una por cada operación nueva. Aporta una propia solo cuando quieras repetir deliberadamente la misma operación sin duplicarla.

Ejemplos de uso:

```js
import { AlfredoClient } from '@abanico-networks/alfredosend-client'
const client = new AlfredoClient({ apiKey: process.env.ALFREDO_API_KEY, clientId: process.env.ALFREDO_CLIENT_ID })
await client.sendTransactional(process.env.ALFREDO_TEMPLATE_ID, { to: [{ email: 'cliente@example.com' }] })
```

```php
use Alfredo\AlfredoClient;
$client = new AlfredoClient($_ENV['ALFREDO_API_KEY'], $_ENV['ALFREDO_CLIENT_ID']);
$client->sendTransactional($_ENV['ALFREDO_TEMPLATE_ID'], ['to' => [['email' => 'cliente@example.com']]]);
```

```ruby
require_relative 'ruby/alfredo'
client = AlfredoClient.new(api_key: ENV.fetch('ALFREDO_API_KEY'), client_id: ENV.fetch('ALFREDO_CLIENT_ID'))
client.send_transactional(ENV.fetch('ALFREDO_TEMPLATE_ID'), { to: [{ email: 'cliente@example.com' }] })
```

También hay un wrapper y ejemplo específico para aplicaciones [Laravel](./laravel/README.md), basado en el cliente HTTP que Laravel ya incluye.
