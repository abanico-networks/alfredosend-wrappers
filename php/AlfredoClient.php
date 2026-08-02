<?php

declare(strict_types=1);

final class AlfredoClient
{
    public function __construct(
        private string $apiKey,
        private string $clientId,
        private string $baseUrl = 'https://api.alfredosend.com',
    ) {}

    public function sendTransactional(string $templateId, array $payload, ?string $idempotencyKey = null): array
    {
        $curl = curl_init(rtrim($this->baseUrl, '/').'/v1/clients/'.$this->clientId.'/transactional/templates/'.$templateId.'/send');
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload, JSON_THROW_ON_ERROR),
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer '.$this->apiKey,
                'Content-Type: application/json',
                'Idempotency-Key: '.($idempotencyKey ?? bin2hex(random_bytes(16))),
            ],
            CURLOPT_RETURNTRANSFER => true,
        ]);
        $response = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
        if ($response === false) throw new RuntimeException(curl_error($curl));
        $body = json_decode($response, true, 512, JSON_THROW_ON_ERROR);
        if ($status < 200 || $status >= 300) throw new RuntimeException($body['message'] ?? "Alfredo respondió {$status}.");
        return $body;
    }
}
