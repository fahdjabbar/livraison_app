// resources/js/Components/SuiviCommande.jsx
import LivraisonMap from "@/Components/LivraisonMap";
import { TruckIcon, MapPinIcon, ClockIcon, ArrowLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";

export default function SuiviCommande({ commande }) {
    const livraison = commande.livraison;

    const handleCancel = () => {
        if (confirm("Voulez-vous vraiment annuler cette commande ?")) {
            router.delete(route("commandes.destroy", commande.id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-blue-800 flex items-center gap-2">
                    <TruckIcon className="w-6 h-6 text-blue-500" />
                    Suivi de la livraison
                </h2>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        commande.etat === "à traiter"
                            ? "bg-yellow-100 text-yellow-700"
                            : commande.etat === "en cours"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                    }`}
                >
                    {commande.etat}
                </span>
            </div>

            {/* Contenu */}
            {livraison ? (
                <>
                    {/* Infos livraison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="w-5 h-5 text-gray-500" />
                            <div>
                                <div className="text-gray-500">Livreur</div>
                                <div className="font-medium text-gray-800">
                                    {commande.livreur?.nom || "-"}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="w-5 h-5 text-orange-400" />
                            <div>
                                <div className="text-gray-500">Position actuelle</div>
                                <div className="font-medium text-gray-800">
                                    {livraison.position_actuelle || "Non renseignée"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carte */}
                    {livraison.position_actuelle && (
                        <div className="mt-5">
                            <LivraisonMap
                                position={livraison.position_actuelle}
                                historique={livraison.historique_positions || []}
                                height={320}
                            />
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="mt-6">
                        <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <ClockIcon className="w-5 h-5 text-gray-500" /> Historique
                        </div>
                        {Array.isArray(livraison.historique_positions) &&
                        livraison.historique_positions.length > 0 ? (
                            <ul className="border-l-2 border-blue-200 pl-4 space-y-3">
                                {livraison.historique_positions.map((pos, idx) => (
                                    <li key={idx} className="text-sm relative">
                                        <span className="absolute -left-[9px] top-1.5 w-3 h-3 bg-blue-500 rounded-full"></span>
                                        <span className="text-gray-500">{pos.date}</span>
                                        <div className="font-medium text-gray-800">{pos.position}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="mt-1 text-sm text-gray-400">Pas d’historique</div>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 italic mt-2">
                    Livraison pas encore affectée.
                </p>
            )}

            {/* Boutons Retour + Annulation */}
            <div className="mt-8 flex flex-wrap gap-3">
                <Link
                    href={route("dashboard")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition duration-200 text-sm font-semibold shadow-sm"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Retour au dashboard
                </Link>

                {commande.etat === "à traiter" && (
                    <button
                        onClick={handleCancel}
                        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
                    >
                        <XCircleIcon className="w-5 h-5" />
                        Annuler la commande
                    </button>
                )}
            </div>
        </div>
    );
}
