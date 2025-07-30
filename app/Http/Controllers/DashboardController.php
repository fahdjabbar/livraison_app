<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Commande;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $data = [];

        if ($user->role === 'Client') {
            $data['commandes'] = Commande::where('client_id', $user->id)->get();
        } elseif ($user->role === 'Livreur') {
            $data['commandes'] = Commande::where('livreur_id', $user->id)->get();
        } elseif ($user->role === 'Admin') {
            $data['commandes'] = Commande::all();
            $data['users'] = User::all();
        }
        

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'data' => $data,
            'session' => session()->all(),
        ]);
    }
         public function toggleStatus(User $user)
    {
      if ($user->role !== 'Livreur') {
        abort(403, 'Seuls les livreurs peuvent être activés/suspendus.');
     }

         $user->statut = $user->statut === 'actif' ? 'suspendu' : 'actif';
         $user->save();

         return redirect()->route('dashboard')->with('success', 'Statut mis à jour avec succès.');
}

}