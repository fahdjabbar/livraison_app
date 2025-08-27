<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bons_retour', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commande_id')->constrained()->cascadeOnDelete();
            $table->foreignId('livreur_id')->constrained('users')->cascadeOnDelete();
            $table->string('motif')->index(); // client_absent, adresse_introuvable, refus_client, colis_endommage, autre
            $table->text('commentaire')->nullable();
            $table->string('statut')->default('en_attente'); // en_attente, valide, cloture
            $table->timestamp('declare_at')->useCurrent();
            $table->timestamp('confirme_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bons_retour');
    }
};
