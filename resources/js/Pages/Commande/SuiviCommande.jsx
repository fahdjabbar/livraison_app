// resources/js/Components/SuiviCommande.jsx
import LivraisonMap from "@/Components/LivraisonMap";

export default function SuiviCommande({ commande }) {
    const livraison = commande.livraison;

    return (
        <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-bold mb-3">Suivi & Timeline</h2>
            <div>
                <p>
                    <strong>Statut :</strong> {commande.etat}
                </p>
                {livraison && (
                    <>
                        <p>
                            <strong>Livreur :</strong>{" "}
                            {commande.livreur?.nom || "-"}
                        </p>
                        <p>
                            <strong>Position actuelle :</strong>{" "}
                            {livraison.position_actuelle || "Non renseignée"}
                        </p>
                        {/* Timeline simple */}
                        <div className="my-3">
                            <strong>Historique :</strong>
                            <ul className="ml-4 mt-1">
                                {livraison.historique_positions &&
                                livraison.historique_positions.length > 0 ? (
                                    livraison.historique_positions.map((pos, idx) => (
                                        <li key={idx} className="text-sm">
                                            {pos.date} — {pos.position}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-sm text-gray-500">
                                        Pas d’historique
                                    </li>
                                )}
                            </ul>
                        </div>
                        {/* Carte si position dispo */}
                        {livraison.position_actuelle && (
                            <div className="mt-4">
                                <LivraisonMap position={livraison.position_actuelle} />
                            </div>
                        )}
                    </>
                )}
                {!livraison && (
                    <p className="text-gray-500 italic mt-2">
                        Livraison pas encore affectée
                    </p>
                )}
            </div>
        </div>
    );
}
