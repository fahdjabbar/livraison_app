<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Commande;

class CommandeLivree extends Notification
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
            ->subject('Votre commande a été livrée')
            ->greeting('Bonjour ' . $notifiable->nom . ' !')
            ->line('Votre commande n°' . $this->commande->id . ' a bien été livrée.')
            ->line('Merci pour votre confiance.');
    }
}
