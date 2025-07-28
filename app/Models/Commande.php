<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'client_id',
        'livreur_id',
        'adresse_envoi',
        'adresse_reception',
        'description_colis',
        'note',
        'etat',
        'date_creation',
        'date_livraison',
    ];
    protected $casts = [
        'date_creation' => 'datetime',
        'date_livraison' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function livreur()
    {
        return $this->belongsTo(User::class, 'livreur_id');
    }

    public function livraison()
    {
        return $this->hasOne(Livraison::class);
    }
}