<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Commande;
use App\Models\Livraison;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function create()
    {
        return Inertia::render('Commande/Create');
    }


        public function show(Commande $commande)
{
    // Vérifier si la commande appartient bien au client connecté
    if ($commande->client_id !== auth()->id()) {
        abort(403, 'Accès non autorisé à cette commande');
    }

    return Inertia::render('Commande/Show', [
        'commande' => $commande->load('livreur', 'livraison'),
    ]);
}

  public function destroy(Commande $commande)
{
    $user = auth()->user();

    // Seul le client PROPRIÉTAIRE ou un ADMIN peut annuler
    $estProprietaire = $commande->client_id === $user->id;
    $estAdmin = $user->role === 'Admin';
    if (!($estProprietaire || $estAdmin)) {
        abort(403, 'Non autorisé à annuler cette commande.');
    }

    // Ne peut annuler que si encore "à traiter"
    if ($commande->etat !== 'à traiter') {
        return back()->with('error', 'Commande non annulable');
    }

    $commande->delete();
    return redirect()->route('dashboard')->with('success', 'Commande annulée avec succès.');
}


 
     public function affecter(Request $request, Commande $commande)
   {
     $request->validate([
        'livreur_id' => 'required|exists:users,id',
      ]);
      // Vérifier que le livreur est bien "actif" et "Livreur"
      $livreur = User::where('id', $request->livreur_id)
                   ->where('role', 'Livreur')
                   ->where('statut', 'actif')
                   ->first();
      if (!$livreur) {
        return back()->with('error', 'Livreur non valide ou inactif.');
    }
     $commande->livreur_id = $livreur->id;
     $commande->etat = 'en cours';
     $commande->save();

      // Créer la livraison associée
    Livraison::create([
        'commande_id' => $commande->id,
        'livreur_id' => $livreur->id,
        'date_debut' => now(),
        'statut' => 'en cours',
        'position_actuelle' => null, // Tu peux mettre une valeur initiale si tu veux
        'historique_positions' => [], // tableau vide au départ
    ]);

     // (Optionnel) Notifier le livreur ici
     return redirect()->route('dashboard')->with('success', 'Livreur affecté avec succès.');
    }

   public function affecterAuto(Commande $commande)
    {
    // Exemple simplifié : choisir le 1er livreur actif dispo
    $livreur = User::where('role', 'Livreur')->where('statut', 'actif')->first();
    if (!$livreur) {
        return back()->with('error', 'Aucun livreur disponible pour l’auto-affectation.');
    }
    $commande->livreur_id = $livreur->id;
    $commande->etat = 'en cours';
    $commande->save();
    return redirect()->route('dashboard')->with('success', 'Livreur affecté automatiquement.');
     } 

     public function suivi(Commande $commande)
{
    $user = auth()->user();

    // Vérifie les droits d'accès
    $estProprietaire = $commande->client_id === $user->id;
    $estAdmin = $user->role === 'Admin';

    if (!($estProprietaire || $estAdmin)) {
        abort(403, 'Non autorisé à accéder à cette commande.');
    }

    // Charge les relations utiles (livreur, livraison)
    $commande->load(['livreur', 'livraison']);

    // Tu peux renvoyer vers SuiviCommande.vue ou AdminShowCommande.vue selon le rôle
    if ($estAdmin) {
    return Inertia::render('Commande/AdminShowCommande', ['commande' => $commande]);
} else {
    return Inertia::render('Commande/SuiviCommande', ['commande' => $commande]);
}

}


     public function marquerLivree(Commande $commande)
{
    // Le livreur doit être le propriétaire de la commande et la commande doit être "en cours"
    if ($commande->livreur_id !== auth()->id()) {
        abort(403, 'Vous ne pouvez modifier que vos propres commandes.');
    }
    if ($commande->etat !== 'en cours') {
        return back()->with('error', 'Commande non modifiable.');
    }
    $commande->etat = 'livrée';
    $commande->date_livraison = now();
    $commande->save();
    // (Optionnel) Notifier le client que sa commande a été livrée.
    return redirect()->route('dashboard')->with('success', 'Commande marquée comme livrée.');
}



    public function store(Request $request)
    {
        $validated = $request->validate([
            'adresse_envoi' => 'required|string|max:255',
            'adresse_reception' => 'required|string|max:255',
            'description_colis' => 'required|string',
            'note' => 'nullable|string',
        ]);

        Commande::create([
            'client_id' => auth()->id(),
            'adresse_envoi' => $validated['adresse_envoi'],
            'adresse_reception' => $validated['adresse_reception'],
            'description_colis' => $validated['description_colis'],
            'note' => $validated['note'],
            'etat' => 'à traiter',
        ]);
        

        return redirect()->route('dashboard')->with('status', 'Order created successfully');
    }
}
