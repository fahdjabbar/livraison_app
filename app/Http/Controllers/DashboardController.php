<?php

namespace App\Http\Controllers;

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
        ]);
    }
}