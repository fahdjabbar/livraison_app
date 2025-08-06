import { Link, router } from "@inertiajs/react";
import LivraisonMap from "@/Components/LivraisonMap";


export default function Show({ commande }) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>
            <p>
                <strong>Adresse d'envoi :</strong> {commande.adresse_envoi}
            </p>
            <p>
                <strong>Adresse de réception :</strong>{" "}
                {commande.adresse_reception}
            </p>
            <p>
                <strong>Description :</strong> {commande.description_colis}
            </p>
            <p>
                <strong>Note :</strong> {commande.note || "Aucune"}
            </p>
            <p>
                <strong>État :</strong> {commande.etat}
            </p>

            {commande.livreur && (
                <div className="mt-4">
                    <h4 className="font-semibold">Livreur :</h4>
                    <p>
                        {commande.livreur.nom} - {commande.livreur.email}
                    </p>
                </div>
            )}
            {/* 👉 MAP ET HISTORIQUE */}
            {commande.livraison && commande.livraison.position_actuelle && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Suivi de la livraison :</h4>
                    <LivraisonMap
                        position={commande.livraison.position_actuelle}
                        historique={commande.livraison.historique_positions || []}
                    />
                    {commande.livraison.historique_positions?.length > 0 && (
                        <ul className="text-xs text-gray-700 mb-3">
                            {commande.livraison.historique_positions.map((h, i) => (
                                <li key={i}>
                                    {h.date} : {h.position}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {commande.etat === "à traiter" && (
                <button
                    onClick={() => {
                        if (confirm("Annuler cette commande ?")) {
                            router.delete(
                                route("commandes.destroy", commande.id)
                            );
                        }
                    }}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Annuler la commande
                </button>
            )}

            <Link
                href={route("dashboard")}
                className="mt-4 inline-block text-blue-500 underline"
            >
                Retour au tableau de bord
            </Link>
        </div>
    );
}
