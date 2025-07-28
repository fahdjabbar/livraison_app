<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livraison extends Model
{
    protected $fillable = [
        'commande_id',
        'livreur_id',
        'date_debut',
        'date_fin',
        'statut',
        'position_actuelle',
        'historique_positions',
    ];

    protected $casts = [
        'historique_positions' => 'array',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function livreur()
    {
        return $this->belongsTo(User::class, 'livreur_id');
    }
}