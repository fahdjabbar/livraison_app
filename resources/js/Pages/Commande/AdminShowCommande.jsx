// resources/js/Components/AdminShowCommande.jsx
import SuiviCommande from "@/Pages/Commande/SuiviCommande";
import AffectationForm from "@/Components/AffectationForm";
import { Link, router } from "@inertiajs/react";

export default function AdminShowCommande({ commande, livreurs }) {
    return (
        <div className="bg-gray-50 p-8 max-w-3xl mx-auto rounded shadow">
            <h1 className="text-2xl font-bold mb-4">
                Détails commande n°{commande.id}
            </h1>
            <div className="mb-4">
                <p>
                    <strong>Client :</strong> {commande.client?.nom} (
                    {commande.client?.email})
                </p>
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
                    <strong>Statut :</strong> {commande.etat}
                </p>
            </div>

            {/* Suivi & Timeline */}
            <SuiviCommande commande={commande} />

            {/* Actions admin */}
            <div className="flex gap-3 mt-6">
                {/* Affectation */}
                {commande.etat === "à traiter" && (
                    <AffectationForm
                        commandeId={commande.id}
                        livreurs={livreurs}
                    />
                )}
                {/* Annulation */}
                {commande.etat === "à traiter" && (
                    <button
                        onClick={() => {
                            if (confirm("Annuler cette commande ?")) {
                                router.delete(
                                    route("commandes.destroy", commande.id)
                                );
                            }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Annuler la commande
                    </button>
                )}
                {/* Fiche livreur */}
                {commande.livreur && (
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">
                        {commande.livreur.nom} ({commande.livreur.email})
                    </span>
                )}
            </div>
        </div>
    );
}
