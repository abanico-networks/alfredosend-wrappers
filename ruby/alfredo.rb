require 'json'
require 'net/http'
require 'securerandom'

class AlfredoClient
  def initialize(api_key:, client_id:, base_url: 'https://api.alfredosend.com')
    @api_key = api_key
    @client_id = client_id
    @base_url = base_url.sub(%r{/$}, '')
  end

  def send_transactional(template_id, payload, idempotency_key: SecureRandom.uuid)
    uri = URI("#{@base_url}/v1/clients/#{@client_id}/transactional/templates/#{template_id}/send")
    request = Net::HTTP::Post.new(uri, {
      'Authorization' => "Bearer #{@api_key}",
      'Content-Type' => 'application/json',
      'Idempotency-Key' => idempotency_key,
    })
    request.body = JSON.generate(payload)
    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http| http.request(request) }
    body = JSON.parse(response.body)
    raise(body['message'] || "Alfredo respondió #{response.code}.") unless response.is_a?(Net::HTTPSuccess)
    body
  end
end
