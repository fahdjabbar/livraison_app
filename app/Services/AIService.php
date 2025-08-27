<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class AIService
{
    protected Client $client;
    protected ?string $apiKey;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.groq.com/openai/v1/',
            'timeout'  => 15,
        ]);

        $this->apiKey = config('services.groq.key');
    }

    /**
     * $context est un tableau faculatif avec, par ex.:
     * [
     *   'user' => ['id'=>..., 'role'=>'Client'|'Livreur'|'Admin'|'Invité'],
     *   'lastOrder' => ['id'=>..., 'etat'=>..., 'position'=>..., 'livreur'=>...],
     *   'rules' => ['delais'=>'...', 'contact'=>'...', 'zones'=>'...'],
     * ]
     */
    public function ask(string $userMessage, array $context = []): string
    {
        $userMessage = trim(mb_substr($userMessage, 0, 1000)); // garde-fou longueur

        // Pas de clé API -> message propre
        if (empty($this->apiKey)) {
            Log::warning('AIService: GROQ_API_KEY is missing.');
            return "Service IA non configuré. Contactez l’administrateur.";
        }

        // Construit un “contexte” compact pour l’IA
        $role = $context['user']['role'] ?? 'Invité';
        $contextMsg = [
            'role'      => $role,
            'isAuth'    => !empty($context['user']['id']),
            'lastOrder' => $context['lastOrder'] ?? null,
            'rules'     => $context['rules'] ?? [
                'delais'  => '24/48h grandes villes',
                'zones'   => 'Maroc',
                'contact' => 'support@livraisonpro.ma / +212 6 00 00 00 00',
            ],
        ];

        try {
            $response = $this->client->post('chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer '.$this->apiKey,
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'model' => 'llama3-8b-8192',
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => "Tu es l’assistant de **LivraisonPro**. 
- Réponds **en français**, ton **professionnel**, **concis**.
- Tu ne traites que des sujets **logistiques** (création/suivi/retour/tarifs/zones/support).
- Si l’info n’est pas disponible, dis-le et propose une **action claire** (ouvrir le suivi, créer commande, contacter support).
- Ne donne **pas** de conseils hors sujet. 
- Termine de préférence par **1 à 3 suggestions d’actions**."
                        ],
                        [
                            'role' => 'assistant',
                            'content' => 'Contexte: '.json_encode($contextMsg, JSON_UNESCAPED_UNICODE),
                        ],
                        [
                            'role' => 'user',
                            'content' => $userMessage,
                        ],
                    ],
                    'max_tokens'  => 500,
                    'temperature' => 0.4, // plus factuel
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            return $data['choices'][0]['message']['content']
                ?? "Désolé, je n’ai pas pu formuler une réponse.";

        } catch (\Throwable $e) {
            Log::error('Erreur AIService: '.$e->getMessage());
            return "⚠️ Service IA temporairement indisponible. Merci de réessayer plus tard.";
        }
    }
}
