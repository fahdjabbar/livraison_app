<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Commande;

class CommandeAnnulee extends Notification
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
            ->subject('Commande annulée')
            ->greeting('Bonjour ' . $notifiable->nom . ' !')
            ->line('La commande n°' . $this->commande->id . ' a été annulée.')
            ->line('Contactez-nous si besoin d\'assistance.');
    }
}
