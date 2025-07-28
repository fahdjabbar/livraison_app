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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('livreur_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('adresse_envoi', 255);
            $table->string('adresse_reception', 255);
            $table->text('description_colis');
            $table->text('note')->nullable();
            $table->enum('etat', ['à traiter', 'en cours', 'livrée', 'annulée'])->default('à traiter');
            $table->dateTime('date_creation')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('date_livraison')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
