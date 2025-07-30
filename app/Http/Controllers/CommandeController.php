<?php

namespace App\Http\Controllers;
use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    if ($commande->client_id !== auth()->id()) {
        abort(403);
    }

    if ($commande->etat !== 'à traiter') {
        return back()->with('error', 'Commande non annulable');
    }

    $commande->delete();
    return redirect()->route('dashboard')->with('status', 'Order created successfully');
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
