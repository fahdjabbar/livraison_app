<?php

   use App\Http\Controllers\ProfileController;
   use App\Http\Controllers\DashboardController;
   use App\Http\Controllers\CommandeController;
   use App\Http\Controllers\LivraisonController;
   use Illuminate\Foundation\Application;
   use Illuminate\Support\Facades\Route;
   use Inertia\Inertia;
   use App\Http\Controllers\Auth\RegisteredUserController;

   Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

   Route::middleware('auth')->group(function () {
       Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
       Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
       Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
       Route::get('/commandes/create', [CommandeController::class, 'create'])->middleware('role:Client')->name('commandes.create');
       Route::post('/commandes', [CommandeController::class, 'store'])->middleware('role:Client')->name('commandes.store');
       Route::delete('/commandes/{commande}', [CommandeController::class, 'destroy'])->middleware('role:Client')->name('commandes.destroy');
       Route::post('/commandes/{commande}/start', [LivraisonController::class, 'start'])->middleware('role:Livreur')->name('livraisons.start');
       Route::post('/commandes/{commande}/complete', [LivraisonController::class, 'complete'])->middleware('role:Livreur')->name('livraisons.complete');
   });
   Route::middleware('guest')->group(function () {
    //Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    //Route::post('register', [RegisteredUserController::class, 'store'])->name('register.store');
    Route::get('register/client', [RegisteredUserController::class, 'createClient'])->name('register.client');
    Route::post('register/client', [RegisteredUserController::class, 'storeClient'])->name('register.client.store');
    Route::get('register/livreur', [RegisteredUserController::class, 'createLivreur'])->name('register.livreur');
    Route::post('register/livreur', [RegisteredUserController::class, 'storeLivreur'])->name('register.livreur.store');
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
});

   require __DIR__.'/../routes/auth.php';