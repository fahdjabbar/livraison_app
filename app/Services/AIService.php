<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class AIService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.groq.com/openai/v1/',
            'timeout'  => 15, // sécurité : 15s max
        ]);
        $this->apiKey = config('services.groq.key');
    }

    public function ask(string $userMessage): string
    {
        try {
            $response = $this->client->post('chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'model' => 'llama3-8b-8192',
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => "Tu es un assistant de livraison professionnel, clair et poli. Réponds de manière concise, en français, et propose des liens si utile."
                        ],
                        [
                            'role' => 'user',
                            'content' => trim($userMessage)
                        ],
                    ],
                    'max_tokens' => 500,
                    'temperature' => 0.7
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            return $data['choices'][0]['message']['content'] ?? "Désolé, je n'ai pas pu comprendre votre demande.";

        } catch (\Exception $e) {
            Log::error('Erreur AIService: ' . $e->getMessage());
            return "⚠️ Service IA temporairement indisponible. Merci de réessayer plus tard.";
        }
    }
}
