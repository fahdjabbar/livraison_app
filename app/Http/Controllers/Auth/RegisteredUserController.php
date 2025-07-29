<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    public function create()
    {
        // Redirige vers une page par défaut ou supprimez cette route si elle n'est plus utilisée
        return redirect()->route('register.client');
    }

    public function createClient()
    {
        return Inertia::render('Auth/RegisterClient');
    }

    public function createLivreur()
    {
        return Inertia::render('Auth/RegisterLivreur');
    }

    public function storeClient(Request $request): RedirectResponse
    {
        $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'adresse' => ['required', 'string', 'max:255'],
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'client',
            'adresse' => $request->adresse,
        ]);

        event(new Registered($user));
        Auth::login($user);
        session()->flash('success', 'Inscription réussie ! Bienvenue.');
        return redirect(RouteServiceProvider::HOME);
    }

    public function storeLivreur(Request $request): RedirectResponse
    {
        $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'adresse' => ['required', 'string', 'max:255'],
            'disponibilite' => ['boolean'],
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'livreur',
            'adresse' => $request->adresse,
            'disponibilite' => $request->disponibilite,
            'statut' => 'suspendu',
        ]);
        

        event(new Registered($user));
        session()->flash('success', 'Inscription réussie ! Bienvenue.');
        Auth::login($user);
        return redirect(RouteServiceProvider::HOME);
    }
}