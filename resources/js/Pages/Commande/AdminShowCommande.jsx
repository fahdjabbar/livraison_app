// resources/js/Components/AdminShowCommande.jsx
import SuiviCommande from "@/Pages/Commande/SuiviCommande";
import AffectationForm from "@/Components/AffectationForm";
import { Link, router } from "@inertiajs/react";
import { UserIcon, MapPinIcon, ClipboardDocumentListIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function AdminShowCommande({ commande, livreurs }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            {/* Titre */}
            <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">
                    Commande #{commande.id}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    commande.etat === "à traiter" ? "bg-yellow-100 text-yellow-700" :
                    commande.etat === "en cours" ? "bg-blue-100 text-blue-700" :
                    "bg-green-100 text-green-700"
                }`}>
                    {commande.etat}
                </span>
            </div>

            {/* Infos principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                    <div>
                        <div className="text-gray-500">Client</div>
                        <div className="font-medium text-gray-800">
                            {commande.client?.nom} ({commande.client?.email})
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500" />
                    <div>
                        <div className="text-gray-500">Description</div>
                        <div className="font-medium text-gray-800">
                            {commande.description_colis}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    <div>
                        <div className="text-gray-500">Adresse d’envoi</div>
                        <div className="font-medium text-gray-800">{commande.adresse_envoi}</div>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <MapPinIcon className="w-5 h-5 text-orange-400" />
                    <div>
                        <div className="text-gray-500">Adresse de réception</div>
                        <div className="font-medium text-gray-800">{commande.adresse_reception}</div>
                    </div>
                </div>

                <div className="md:col-span-2 flex items-start gap-2">
                    <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500" />
                    <div>
                        <div className="text-gray-500">Note</div>
                        <div className="font-medium text-gray-800">{commande.note || "Aucune"}</div>
                    </div>
                </div>
            </div>

            {/* Suivi & Timeline */}
            <div className="mt-8">
                <SuiviCommande commande={commande} />
            </div>

            {/* Actions admin */}
            <div className="mt-8 flex flex-wrap gap-3">
                {commande.etat === "à traiter" && (
                    <AffectationForm commandeId={commande.id} livreurs={livreurs} />
                )}

                {commande.etat === "à traiter" && (
                    <button
                        onClick={() => {
                            if (confirm("Annuler cette commande ?")) {
                                router.delete(route("commandes.destroy", commande.id));
                            }
                        }}
                        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-sm transition"
                    >
                        <XCircleIcon className="w-5 h-5" />
                        Annuler la commande
                    </button>
                )}

                {commande.livreur && (
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
                        <TruckIcon className="w-5 h-5 text-blue-500" />
                        {commande.livreur.nom} ({commande.livreur.email})
                    </span>
                )}
            </div>
        </div>
    );
}
