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
