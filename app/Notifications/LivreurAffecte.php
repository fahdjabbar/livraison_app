<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Commande;

class LivreurAffecte extends Notification
{
    use Queueable;

    public $commande;

    public function __construct(Commande $commande)
    {
        $this->commande = $commande;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nouvelle livraison à effectuer')
            ->greeting('Bonjour ' . $notifiable->nom . ' !')
            ->line('Une nouvelle commande vous a été affectée.')
            ->line('Commande n° ' . $this->commande->id)
            ->line('Adresse d\'envoi : ' . $this->commande->adresse_envoi)
            ->line('Adresse de réception : ' . $this->commande->adresse_reception)
            ->action('Voir la commande', url('/commandes/' . $this->commande->id))
            ->line('Merci de traiter cette livraison rapidement.');
    }
}
