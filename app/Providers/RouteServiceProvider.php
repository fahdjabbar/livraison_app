<?php
namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/dashboard';

    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    public static function home()
    {
        return match (auth()->check() ? auth()->user()->role : null) {
            'client' => '/dashboard/client',
            'livreur' => '/dashboard/livreur',
            'admin' => '/admin',
            default => '/login',
        };
    }

    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            Limit::perMinute(60);
        });
    }
}