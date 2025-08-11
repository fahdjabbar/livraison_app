<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\LivraisonController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ChatbotController;

// Page d’accueil
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');
Route::post('/chatbot/message', [ChatbotController::class, 'message'])
    ->middleware(['throttle:30,1']) // 30 req / minute
    ->name('chatbot.message');

// Routes accessibles uniquement si connecté
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::patch('/users/{user}/toggle-status', [DashboardController::class, 'toggleStatus'])->name('users.toggleStatus');
    Route::post('/commandes/{commande}/affecter', [CommandeController::class, 'affecter'])->name('commandes.affecter');
    Route::delete('/commandes/{commande}', [CommandeController::class, 'destroy'])->name('commandes.destroy'); 
    // Pour la mise à jour de la position d’une livraison
    Route::post('/livraisons/{livraison}/position', [LivraisonController::class, 'updatePosition'])->name('livraisons.position');
    // Accessible à tous les utilisateurs connectés (client + admin)
     Route::get('/commandes/{commande}/suivi', [CommandeController::class, 'suivi'])
    ->name('commandes.suivi');

    


    // 🧍 CLIENT
    Route::middleware('role:Client')->group(function () {
        Route::get('/commandes/create', [CommandeController::class, 'create'])->name('commandes.create');
        Route::post('/commandes', [CommandeController::class, 'store'])->name('commandes.store');
        Route::get('/commandes/{commande}', [CommandeController::class, 'show'])->name('commandes.show');
        
    });

    // 🧍 LIVREUR
    Route::middleware('role:Livreur')->group(function () {
         Route::post('/commandes/{commande}/livree', [CommandeController::class, 'marquerLivree'])->name('commandes.livree');
        //Route::post('/commandes/{commande}/start', [LivraisonController::class, 'start'])->name('livraisons.start');
        //Route::post('/commandes/{commande}/complete', [LivraisonController::class, 'complete'])->name('livraisons.complete');
    });
    

    // Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Auth invité
Route::middleware('guest')->group(function () {
    Route::get('register/client', [RegisteredUserController::class, 'createClient'])->name('register.client');
    Route::post('register/client', [RegisteredUserController::class, 'storeClient'])->name('register.client.store');
    Route::get('register/livreur', [RegisteredUserController::class, 'createLivreur'])->name('register.livreur');
    Route::post('register/livreur', [RegisteredUserController::class, 'storeLivreur'])->name('register.livreur.store');
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
});

require __DIR__.'/../routes/auth.php';
