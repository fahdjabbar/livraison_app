<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Commande;

class CommandeCreee extends Notification
{
    use Queueable;

    public $commande;

    public function __construct(Commande $commande)
    {
        $this->commande = $commande;
    }

    public function via($notifiable)
    {
        return ['mail']; // Ajoute 'database' si tu veux la stocker en base aussi
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Votre commande a bien été enregistrée')
            ->greeting('Bonjour ' . $notifiable->nom . ' !')
            ->line('Merci pour votre commande n°' . $this->commande->id)
            ->line('Adresse d\'envoi : ' . $this->commande->adresse_envoi)
            ->line('Adresse de réception : ' . $this->commande->adresse_reception)
            ->action('Voir ma commande', url('/commandes/' . $this->commande->id))
            ->line('Merci d\'utiliser notre service de livraison !');
    }
}
