import { Link, useForm } from "@inertiajs/react";
import LivraisonPositionForm from "@/Components/LivraisonPositionForm";
import {
    CheckCircleIcon,
    MapPinIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import LivraisonMap from "@/Components/LivraisonMap";

export default function SuiviLivreur({ commande }) {
    const livraison = commande.livraison;

    // Formulaire retour
    const { data, setData, post, processing, errors, reset } = useForm({
        motif: "client_absent",
        commentaire: "",
    });

    const submitRetour = (e) => {
        e.preventDefault();
        post(route("retours.store", commande.id), {
            onSuccess: () => reset(),
        });
    };

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

                        <div className="mt-6 flex gap-4 flex-wrap">
                            {/* Bouton livrée */}
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

                            {/* Formulaire Déclarer un retour */}
                           <form
    method="POST"
    action={route("retours.store", commande.id)}
    className="mt-4 space-y-2"
>
    <input
        type="hidden"
        name="_token"
        value={
            document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? ""
        }
    />

    <label className="block text-sm font-medium text-gray-700">
        Motif du retour
    </label>
    <select
        name="motif"
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
    >
        <option value="">-- Choisir un motif --</option>
        <option value="client_absent">Client absent</option>
        <option value="adresse_introuvable">Adresse introuvable</option>
        <option value="refus_client">Refus du client</option>
        <option value="colis_endommage">Colis endommagé</option>
        <option value="autre">Autre</option>
    </select>

    <label className="block text-sm font-medium text-gray-700">
        Commentaire (optionnel)
    </label>
    <textarea
        name="commentaire"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        placeholder="Détails..."
    ></textarea>

    <button
        type="submit"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm shadow"
    >
        Déclarer un retour
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
