<?php

namespace App\Http\Controllers;

use App\Models\Livraison;
use Illuminate\Http\Request;

class LivraisonController extends Controller
{
    //public function updatePosition(Request $request, Livraison $livraison)
   public function updatePosition(Request $request, Livraison $livraison)
   {
    // Vérification : Seul le livreur concerné peut modifier sa livraison
    if ($livraison->livreur_id !== auth()->id()) {
        abort(403, 'Non autorisé');
    }

    $request->validate([
        'position_actuelle' => 'required|string|max:255',
    ]);

    // Historique (optionnel)
    $historique = $livraison->historique_positions ?? [];
    $historique[] = [
        'date' => now()->toDateTimeString(),
        'position' => $request->position_actuelle,
    ];

    $livraison->update([
        'position_actuelle' => $request->position_actuelle,
        'historique_positions' => $historique,
    ]);

    return redirect()->back()->with('success', 'Position mise à jour !');
}
}
