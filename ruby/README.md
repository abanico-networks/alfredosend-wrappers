# Gem Alfredo

```ruby
require 'alfredo'

alfredo = AlfredoClient.new(api_key: ENV.fetch('ALFREDO_API_KEY'), client_id: ENV.fetch('ALFREDO_CLIENT_ID'))
alfredo.send_transactional(ENV.fetch('ALFREDO_TEMPLATE_ID'), {
  to: [{ email: 'cliente@example.com', name: 'Cliente' }],
  data: { name: 'Cliente' },
})
```

Instálala como `gem install alfredosend` una vez publicada. La idempotencia es opcional.
