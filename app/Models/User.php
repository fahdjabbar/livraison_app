<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'email',
        'password',
        'role',
        'statut',
        'adresse',
        'disponibilite',
    ];

    /*public function setMotDePasseAttribute($value)
    {
        $this->attributes['mot_de_passe'] = Hash::make($value);
    }*/

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'client_id');
    }

    public function livraisons()
    {
        return $this->hasMany(Livraison::class, 'livreur_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [];
    }
    public function setRoleAttribute($value)
   {
    $this->attributes['role'] = ucfirst(strtolower($value));
   }
   public function bonsRetourDeclares()
   {
    return $this->hasMany(\App\Models\BonRetour::class, 'livreur_id');
   }
}