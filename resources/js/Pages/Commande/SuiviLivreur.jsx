import { Link } from "@inertiajs/react";
import LivraisonPositionForm from "@/Components/LivraisonPositionForm";
import {
    CheckCircleIcon,
    MapPinIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import LivraisonMap from "@/Components/LivraisonMap";

export default function SuiviLivreur({ commande }) {
    const livraison = commande.livraison;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-extrabold text-blue-800">
                        Livraison – Commande #{commande.id}
                    </h1>
                    <TruckIcon className="w-6 h-6 text-blue-500" />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-sm">
                        <div className="text-gray-500">Adresse d’envoi</div>
                        <div className="font-medium text-gray-800">
                            {commande.adresse_envoi}
                        </div>
                    </div>
                    <div className="text-sm">
                        <div className="text-gray-500">
                            Adresse de réception
                        </div>
                        <div className="font-medium text-gray-800">
                            {commande.adresse_reception}
                        </div>
                    </div>
                    <div className="md:col-span-2 text-sm text-gray-600">
                        <span className="text-gray-500">Description: </span>
                        {commande.description_colis}
                    </div>
                </div>

                {livraison ? (
                    <>
                        <div className="mt-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPinIcon className="w-5 h-5 text-gray-400" />
                                <span>Position actuelle : </span>
                                <span className="font-medium text-gray-800">
                                    {livraison.position_actuelle ||
                                        "Non renseignée"}
                                </span>
                            </div>
                            {commande.livraison?.position_actuelle && (
                                <LivraisonMap
                                    position={
                                        commande.livraison.position_actuelle
                                    }
                                    historique={
                                        commande.livraison
                                            .historique_positions || []
                                    }
                                    height={320}
                                />
                            )}

                            <div className="mt-3">
                                <LivraisonPositionForm
                                    livraisonId={livraison.id}
                                    initialValue={livraison.position_actuelle}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <form
                                method="POST"
                                action={route("commandes.livree", commande.id)}
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={
                                        document
                                            .querySelector(
                                                'meta[name="csrf-token"]'
                                            )
                                            ?.getAttribute("content") ?? ""
                                    }
                                />
                                <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm shadow">
                                    <CheckCircleIcon className="w-5 h-5" />
                                    Marquer comme livrée
                                </button>
                            </form>
                        </div>

                        {/* Historique simple */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-gray-700">
                                Historique positions
                            </div>
                            {Array.isArray(livraison.historique_positions) &&
                            livraison.historique_positions.length > 0 ? (
                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                    {livraison.historique_positions.map(
                                        (h, i) => (
                                            <li key={i}>
                                                <span className="text-gray-500">
                                                    {h.date} :
                                                </span>{" "}
                                                {h.position}
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <div className="mt-1 text-sm text-gray-400">
                                    Pas d’historique
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="mt-6 text-sm text-gray-500 italic">
                        Livraison pas encore affectée.
                    </div>
                )}

                <div className="mt-8">
                    <Link
                        href={route("dashboard")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                        ← Retour au dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
