<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Services\AIService;

class ChatbotController extends Controller
{
    public function message(Request $request, AIService $ai)
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $userMessage = trim($request->input('message'));

        // Switch MVP / AI
        if (env('CHATBOT_MODE') === 'ai') {
            $botReply = $ai->ask($userMessage);
        } else {
            $botReply = $this->rulesBasedReply($userMessage);
        }

        return response()->json($botReply);
    }

    /**
     * Logique MVP basée sur des règles simples
     */
    private function rulesBasedReply($msg)
    {
        $msg = mb_strtolower($msg);

        if (preg_match('/(bonjour|salut|salam)/', $msg)) {
            return [
                'reply' => "Bonjour 👋 Comment puis-je vous aider ?",
                'suggestions' => ["Créer une commande", "Suivre ma commande", "Zones & délais", "Parler à un agent"]
            ];
        }

        if (preg_match('/(suivi|statut|commande)/', $msg)) {
            if (!auth()->check()) {
                return [
                    'reply' => "Pour suivre une commande, connectez-vous puis ouvrez le Dashboard → Vos commandes. Ou indiquez votre **numéro de commande**.",
                    'suggestions' => ["Se connecter", "Créer un compte"]
                ];
            }

            $commande = Commande::where('client_id', auth()->id())
                ->latest('created_at')->with('livraison','livreur')->first();

            if (!$commande) {
                return [
                    'reply' => "Aucune commande trouvée pour votre compte. Vous pouvez en créer une depuis le Dashboard.",
                    'suggestions' => ["Créer une commande", "Contacter le support"]
                ];
            }

            $etat = $commande->etat;
            $pos  = optional($commande->livraison)->position_actuelle ?? "—";

            return [
                'reply' => "Votre dernière commande (#{$commande->id}) est **{$etat}**. Position actuelle : {$pos}.",
                'suggestions' => ["Voir le suivi", "Créer une commande", "Parler à un agent"],
                'links' => [
                    ['label' => 'Ouvrir le suivi', 'href' => route('commandes.suivi', $commande)]
                ]
            ];
        }

        if (preg_match('/(zone|villes|délais)/', $msg)) {
            return [
                'reply' => "Nous livrons dans tout le Maroc 🇲🇦. Grandes villes en 24/48h. Pour un devis précis, indiquez les villes d’envoi et de réception.",
                'suggestions' => ["Tarif indicatif", "Parler à un agent"]
            ];
        }

        if (preg_match('/(agent|humain|contact|support)/', $msg)) {
            return [
                'reply' => "D’accord, je transmets au support. Vous pouvez aussi écrire à **support@livraisonpro.ma** ou appeler **+212 6 00 00 00 00**.",
                'suggestions' => ["Envoyer un email", "Rappeler"]
            ];
        }

        // Fallback
        return [
            'reply' => "Je n’ai pas bien compris 🤔. Essayez l’une des options ci-dessous.",
            'suggestions' => ["Suivre ma commande", "Créer une commande", "Parler à un agent"]
        ];
    }
}
