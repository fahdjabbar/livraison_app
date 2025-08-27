<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BonRetour extends Model
{
    protected $table = 'bons_retour';

    protected $fillable = [
        'commande_id',
        'livreur_id',
        'motif',
        'commentaire',
        'statut',
        'declare_at',
        'confirme_at',
    ];

    protected $casts = [
        'declare_at' => 'datetime',
        'confirme_at' => 'datetime',
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
