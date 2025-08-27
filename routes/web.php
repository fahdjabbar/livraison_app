<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\RetourController;

// Accueil
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');
// routes/web.php (dans le groupe auth + Admin)
Route::get('/admin/retours', [RetourController::class, 'index'])->name('retours.index');
Route::post('/retours/{retour}/confirmer', [RetourController::class, 'confirm'])->name('retours.confirmer');
Route::get('/admin/retours/export', [RetourController::class, 'exportCsv'])->name('retours.export');


// Chatbot
Route::post('/chatbot/message', [ChatbotController::class, 'message'])
    ->middleware(['throttle:30,1'])
    ->name('chatbot.message');

// Authenticated
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::patch('/users/{user}/toggle-status', [DashboardController::class, 'toggleStatus'])->name('users.toggleStatus');

    // Commandes (communs)
    Route::post('/commandes/{commande}/affecter', [CommandeController::class, 'affecter'])->name('commandes.affecter');
    Route::delete('/commandes/{commande}', [CommandeController::class, 'destroy'])->name('commandes.destroy');
    Route::get('/commandes/{commande}/suivi', [CommandeController::class, 'suivi'])->name('commandes.suivi');

    // Livraison
    Route::post('/livraisons/{livraison}/position', [LivraisonController::class, 'updatePosition'])->name('livraisons.position');

    // Client
    Route::middleware('role:Client')->group(function () {
        Route::get('/commandes/create', [CommandeController::class, 'create'])->name('commandes.create');
        Route::post('/commandes', [CommandeController::class, 'store'])->name('commandes.store');
        Route::get('/commandes/{commande}', [CommandeController::class, 'show'])->name('commandes.show');
    });

    // Livreur
    Route::middleware('role:Livreur')->group(function () {
        Route::post('/commandes/{commande}/livree', [CommandeController::class, 'marquerLivree'])->name('commandes.livree');
        Route::post('/commandes/{commande}/retour', [RetourController::class, 'store'])->name('retours.store');
    });

    // Admin retours
    Route::middleware('role:Admin')->group(function () {
        Route::get('/admin/retours', [RetourController::class, 'index'])->name('retours.index');
        Route::post('/retours/{retour}/confirmer', [RetourController::class, 'confirm'])->name('retours.confirmer');
    });

    // Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Invités
Route::middleware('guest')->group(function () {
    Route::get('register/client', [RegisteredUserController::class, 'createClient'])->name('register.client');
    Route::post('register/client', [RegisteredUserController::class, 'storeClient'])->name('register.client.store');

    Route::get('register/livreur', [RegisteredUserController::class, 'createLivreur'])->name('register.livreur');
    Route::post('register/livreur', [RegisteredUserController::class, 'storeLivreur'])->name('register.livreur.store');

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
});

require __DIR__ . '/../routes/auth.php';
