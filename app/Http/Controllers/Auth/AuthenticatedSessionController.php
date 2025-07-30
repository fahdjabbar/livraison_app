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
            'password' => 'required|string',
        ]);

        $user = \App\Models\User::where('email', $credentials['email'])->first();

     if (!$user || !\Illuminate\Support\Facades\Hash::check($credentials['password'], $user->password)) {
    return back()->withErrors([
        'email' => 'Les identifiants fournis ne correspondent pas à nos enregistrements.',
    ])->onlyInput('email');
}

      if ($user->statut !== 'actif') {
      return back()->withErrors([
        'email' => 'Votre compte n\'est pas encore activé. Veuillez contacter un administrateur.',
      ])->onlyInput('email');
}

Auth::login($user, $request->boolean('remember'));
$request->session()->regenerate();

return redirect()->intended(route('dashboard'));
 {
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