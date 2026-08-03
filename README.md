# Wrappers de Alfredo

Clientes ligeros, sin dependencias externas, para disparar transaccionales.

Cada wrapper recibe `apiKey`, `clientId` y `templateId`. La integración normal no requiere una cabecera `Idempotency-Key`: basta con esos tres valores y el payload del envío. Alfredo genera una clave para cada envío nuevo; solo aporta una propia cuando quieras repetir deliberadamente la misma operación sin duplicarla.

Ejemplos de uso:

```js
import { AlfredoClient } from './node/alfredo.js'
const client = new AlfredoClient({ apiKey: process.env.ALFREDO_API_KEY, clientId: process.env.ALFREDO_CLIENT_ID })
await client.sendTransactional(process.env.ALFREDO_TEMPLATE_ID, { to: [{ email: 'cliente@example.com' }] })
```

```php
require 'php/AlfredoClient.php';
$client = new AlfredoClient($_ENV['ALFREDO_API_KEY'], $_ENV['ALFREDO_CLIENT_ID']);
$client->sendTransactional($_ENV['ALFREDO_TEMPLATE_ID'], ['to' => [['email' => 'cliente@example.com']]]);
```

```ruby
require_relative 'ruby/alfredo'
client = AlfredoClient.new(api_key: ENV.fetch('ALFREDO_API_KEY'), client_id: ENV.fetch('ALFREDO_CLIENT_ID'))
client.send_transactional(ENV.fetch('ALFREDO_TEMPLATE_ID'), { to: [{ email: 'cliente@example.com' }] })
```
