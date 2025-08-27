<?php

namespace App\Http\Controllers;

use App\Models\BonRetour;
use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RetourController extends Controller
{
    // Livreurs (ou Admin) déclarent un retour
    public function store(Request $request, Commande $commande)
    {
        $request->validate([
            'motif' => 'required|string|in:client_absent,adresse_introuvable,refus_client,colis_endommage,autre',
            'commentaire' => 'nullable|string|max:1000',
        ]);

        $user = auth()->user();

        // Sécurité rapide : le livreur affecté à la commande ou un admin
        $estLivreurDeCetteCommande = $commande->livreur_id === $user->id;
        $estAdmin = $user->role === 'Admin';
        if (!($estLivreurDeCetteCommande || $estAdmin)) {
            abort(403, 'Non autorisé.');
        }

        // Évite les doublons "en attente"
        $existeDeja = BonRetour::where('commande_id', $commande->id)
            ->where('statut', 'en_attente')
            ->exists();
        if ($existeDeja) {
            return back()->with('error', 'Un bon de retour est déjà en attente pour cette commande.');
        }

        BonRetour::create([
            'commande_id' => $commande->id,
            'livreur_id'  => $estAdmin ? ($commande->livreur_id ?? $user->id) : $user->id,
            'motif'       => $request->motif,
            'commentaire' => $request->commentaire,
            'statut'      => 'en_attente',
        ]);

        // Mets à jour le statut de la commande pour le suivi (facultatif)
        $commande->etat = 'en retour'; // nouveau statut textuel, non destructif
        $commande->save();

        return redirect()
    ->route('commandes.suivi', $commande->id)
    ->with('success', 'Bon de retour déclaré avec succès.');

    }

    // Admin confirme la réception retour
    public function confirm(BonRetour $retour)
    {
        $user = auth()->user();
        if ($user->role !== 'Admin') {
            abort(403);
        }

        $retour->statut = 'valide';
        $retour->confirme_at = now();
        $retour->save();

        // Marque la commande comme retournée (facultatif : "retournée")
        $commande = $retour->commande;
        $commande->etat = 'retournée';
        $commande->save();

        return back()->with('success', 'Retour confirmé et commande marquée comme retournée.');
    }

    /// app/Http/Controllers/RetourController.php

public function index(Request $request)
{
    $user = auth()->user();
    if ($user->role !== 'Admin') abort(403);

    $status = $request->string('status')->trim()->toString(); // en_attente|valide|rejete|''
    $q      = $request->string('q')->trim()->toString();
    $from   = $request->date('from');
    $to     = $request->date('to');

    $query = BonRetour::with(['commande.client', 'livreur'])->latest();

    // Filtres
    $query->when($status !== '', fn($q2) => $q2->where('statut', $status));
    $query->when($q !== '', function ($q2) use ($q) {
        $q2->where(function ($sub) use ($q) {
            $sub->whereHas('commande', fn($c) => $c->where('id', 'like', "%{$q}%")
                                                  ->orWhere('adresse_envoi', 'like', "%{$q}%")
                                                  ->orWhere('adresse_reception', 'like', "%{$q}%"))
                ->orWhereHas('commande.client', fn($c) => $c->where('nom', 'like', "%{$q}%")
                                                           ->orWhere('email', 'like', "%{$q}%"))
                ->orWhereHas('livreur', fn($l) => $l->where('nom', 'like', "%{$q}%")
                                                    ->orWhere('email', 'like', "%{$q}%"))
                ->orWhere('motif', 'like', "%{$q}%")
                ->orWhere('commentaire', 'like', "%{$q}%");
        });
    });
    $query->when($from, fn($q2) => $q2->whereDate('created_at', '>=', $from));
    $query->when($to,   fn($q2) => $q2->whereDate('created_at', '<=', $to));

    $retours = $query->paginate(15)->withQueryString();

    // KPIs rapides
    $stats = [
        'en_attente' => BonRetour::where('statut', 'en_attente')->count(),
        'valide'     => BonRetour::where('statut', 'valide')->count(),
        'rejete'     => BonRetour::where('statut', 'rejete')->count(),
        'total'      => BonRetour::count(),
    ];

    return \Inertia\Inertia::render('Admin/RetoursIndex', [
        'retours' => $retours,
        'filters' => [
            'status' => $status,
            'q'      => $q,
            'from'   => $from?->toDateString(),
            'to'     => $to?->toDateString(),
        ],
        'stats'   => $stats,
    ]);
}

public function exportCsv(Request $request)
{
    $user = auth()->user();
    if ($user->role !== 'Admin') abort(403);

    $status = $request->string('status')->trim()->toString();
    $q      = $request->string('q')->trim()->toString();
    $from   = $request->date('from');
    $to     = $request->date('to');

    $query = BonRetour::with(['commande.client', 'livreur'])->latest();
    $query->when($status !== '', fn($q2) => $q2->where('statut', $status));
    $query->when($q !== '', function ($q2) use ($q) {
        $q2->where(function ($sub) use ($q) {
            $sub->whereHas('commande', fn($c) => $c->where('id', 'like', "%{$q}%")
                                                  ->orWhere('adresse_envoi', 'like', "%{$q}%")
                                                  ->orWhere('adresse_reception', 'like', "%{$q}%"))
                ->orWhereHas('commande.client', fn($c) => $c->where('nom', 'like', "%{$q}%")
                                                           ->orWhere('email', 'like', "%{$q}%"))
                ->orWhereHas('livreur', fn($l) => $l->where('nom', 'like', "%{$q}%")
                                                    ->orWhere('email', 'like', "%{$q}%"))
                ->orWhere('motif', 'like', "%{$q}%")
                ->orWhere('commentaire', 'like', "%{$q}%");
        });
    });
    $query->when($from, fn($q2) => $q2->whereDate('created_at', '>=', $from));
    $query->when($to,   fn($q2) => $q2->whereDate('created_at', '<=', $to));

    $rows = $query->get();

    $headers = [
        'Content-Type'        => 'text/csv; charset=UTF-8',
        'Content-Disposition' => 'attachment; filename=retours.csv',
    ];

    return response()->streamDownload(function () use ($rows) {
        $out = fopen('php://output', 'w');
        // BOM pour Excel
        fwrite($out, "\xEF\xBB\xBF");
        fputcsv($out, ['ID', 'Commande', 'Client', 'Livreur', 'Motif', 'Commentaire', 'Statut', 'Déclaré le', 'Confirmé le']);
        foreach ($rows as $r) {
            fputcsv($out, [
                $r->id,
                $r->commande_id,
                optional($r->commande->client)->nom . ' <' . optional($r->commande->client)->email . '>',
                optional($r->livreur)->nom . ' <' . optional($r->livreur)->email . '>',
                $r->motif,
                $r->commentaire,
                $r->statut,
                $r->created_at?->format('Y-m-d H:i'),
                $r->confirme_at?->format('Y-m-d H:i'),
            ]);
        }
        fclose($out);
    }, 'retours.csv', $headers);
}

}
