<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('livraisons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commande_id')->constrained('commandes')->onDelete('cascade');
            $table->foreignId('livreur_id')->constrained('users')->onDelete('cascade');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin')->nullable();
            $table->enum('statut', ['en cours', 'livrée'])->default('en cours');
            $table->string('position_actuelle', 255);
            $table->json('historique_positions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraisons');
    }
};
