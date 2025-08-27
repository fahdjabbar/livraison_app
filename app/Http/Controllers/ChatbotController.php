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

        // --- Quelques intents utiles (peu intrusifs) ---
        $normalized = mb_strtolower($userMessage);
        $intent = null;
        $orderId = null;

        // suivi #123 ou commande 123
        if (preg_match('/(?:#|\bcommande\s*)(\d+)/u', $normalized, $m)) {
            $intent = 'order_by_id';
            $orderId = (int) $m[1];
        } elseif (preg_match('/\b(suivi|statut)\b/u', $normalized)) {
            $intent = 'last_order';
        } elseif (preg_match('/\b(tarif|prix|coût|cout)\b/u', $normalized)) {
            $intent = 'pricing';
        } elseif (preg_match('/\b(zone|villes|couverture|délais|delais)\b/u', $normalized)) {
            $intent = 'zones';
        }

        // --- Mode MVP ou IA ---
        if (env('CHATBOT_MODE') !== 'ai') {
            $payload = $this->rulesBasedReply($userMessage);
            return response()->json($payload);
        }

        // --- Contexte IA ---
        $user = auth()->user();
        $role = $user?->role ?? 'Invité';

        // Dernière commande du client
        $lastOrder = null;
        if ($user && $role === 'Client') {
            $lastOrder = Commande::where('client_id', $user->id)
                ->latest('created_at')->with('livraison','livreur')->first();
        }

        // Si l’utilisateur a demandé un suivi par #id, on tente de charger
        $orderById = null;
        if ($orderId) {
            $q = Commande::with('livraison','livreur')
                ->where('id', $orderId);

            // Restriction d’accès : un client ne voit que ses commandes
            if ($role === 'Client') {
                $q->where('client_id', $user->id);
            }
            $orderById = $q->first();
        }

        // Construit le contexte transmis à l’IA
        $context = [
            'user' => [
                'id'   => $user?->id,
                'role' => $role,
                'email'=> $user?->email,
            ],
            'lastOrder' => $lastOrder ? [
                'id'       => $lastOrder->id,
                'etat'     => $lastOrder->etat,
                'position' => optional($lastOrder->livraison)->position_actuelle,
                'livreur'  => $lastOrder->livreur?->nom,
            ] : null,
            'orderById' => $orderById ? [
                'id'       => $orderById->id,
                'etat'     => $orderById->etat,
                'position' => optional($orderById->livraison)->position_actuelle,
                'livreur'  => $orderById->livreur?->nom,
            ] : null,
            'intent' => $intent,
            'rules'  => [
                'delais'  => '24/48h grandes villes',
                'zones'   => 'Maroc',
                'contact' => 'support@livraisonpro.ma / +212 6 00 00 00 00',
            ],
        ];

        // Appel IA
        $replyText = $ai->ask($userMessage, $context);

        // Suggestions/links basés sur l’intent (tu peux raffiner)
        $suggestions = match ($intent) {
            'order_by_id', 'last_order' => ['Ouvrir le suivi', 'Créer une commande', 'Contacter le support'],
            'pricing'                   => ['Demander un devis', 'Zones & délais', 'Parler à un agent'],
            'zones'                     => ['Voir nos zones', 'Créer une commande', 'Contacter le support'],
            default                     => ['Suivre ma commande', 'Créer une commande', 'Contacter le support'],
        };

        $links = [];
        if ($orderById) {
            $links[] = ['label' => 'Ouvrir le suivi', 'href' => route('commandes.suivi', $orderById)];
        } elseif ($lastOrder) {
            $links[] = ['label' => 'Ouvrir le suivi', 'href' => route('commandes.suivi', $lastOrder)];
        }

        return response()->json([
            'reply' => $replyText,
            'suggestions' => $suggestions,
            'links' => $links,
        ]);
    }

    // --- MVP rules (inchangé) ---
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

        return [
            'reply' => "Je n’ai pas bien compris 🤔. Essayez l’une des options ci-dessous.",
            'suggestions' => ["Suivre ma commande", "Créer une commande", "Parler à un agent"]
        ];
    }
}
