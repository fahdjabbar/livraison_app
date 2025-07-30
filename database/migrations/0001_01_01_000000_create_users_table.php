<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable();
            $table->string('email')->unique();
            $table->string('role')->default('client');
            $table->string('adresse')->nullable();
            $table->boolean('disponibilite')->default(false);
            $table->string('password'); // Doit être présent et non nullable par défaut
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->string('statut')->default('actif');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};