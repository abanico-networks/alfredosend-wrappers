# Cliente PHP de Alfredo

Instálalo con Composer cuando se publique como `alfredosend/client`.

```php
use Alfredo\AlfredoClient;

$alfredo = new AlfredoClient($_ENV['ALFREDO_API_KEY'], $_ENV['ALFREDO_CLIENT_ID']);
$alfredo->sendTransactional($_ENV['ALFREDO_TEMPLATE_ID'], [
    'to' => [['email' => 'cliente@example.com', 'name' => 'Cliente']],
    'data' => ['name' => 'Cliente'],
]);
```

La clave de idempotencia es opcional; Alfredo genera una para cada solicitud nueva.
