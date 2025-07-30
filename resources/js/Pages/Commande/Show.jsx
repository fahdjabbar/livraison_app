import { Link } from '@inertiajs/react';

export default function Show({ commande }) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>
            <p><strong>Adresse d'envoi :</strong> {commande.adresse_envoi}</p>
            <p><strong>Adresse de réception :</strong> {commande.adresse_reception}</p>
            <p><strong>Description :</strong> {commande.description_colis}</p>
            <p><strong>Note :</strong> {commande.note || 'Aucune'}</p>
            <p><strong>État :</strong> {commande.etat}</p>

            {commande.livreur && (
                <div className="mt-4">
                    <h4 className="font-semibold">Livreur :</h4>
                    <p>{commande.livreur.nom} - {commande.livreur.email}</p>
                </div>
            )}

            {commande.etat === 'à traiter' && (
                <form
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (confirm("Annuler cette commande ?")) {
                            document.getElementById("form-delete").submit();
                        }
                    }}
                >
                    <input type="hidden" name="_method" value="DELETE" />
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        form="form-delete"
                    >
                        Annuler la commande
                    </button>
                </form>
            )}

            <Link href={route('dashboard')} className="mt-4 inline-block text-blue-500 underline">
                Retour au tableau de bord
            </Link>
        </div>
    );
}
