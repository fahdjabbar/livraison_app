<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        Log::info('Login page accessed');
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        Log::info('Login attempt', ['input' => $request->all()]);

        $credentials = $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['mot_de_passe'], 'statut' => 'actif'], $request->boolean('remember'))) {
            $request->session()->regenerate();
            Log::info('Login successful', ['user_id' => Auth::id()]);
            return redirect()->intended(route('dashboard'));
        }

        Log::warning('Login failed', ['email' => $credentials['email']]);

        return back()->withErrors([
            'email' => 'Les identifiants fournis ne correspondent pas à nos enregistrements.',
        ])->onlyInput('email');
    }

    public function destroy(Request $request)
    {
        Log::info('Logout', ['user_id' => Auth::id()]);
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}