import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AffectationForm from "@/Components/AffectationForm";
import LivraisonPositionForm from "@/Components/LivraisonPositionForm";

export default function Dashboard({ auth, data, session }) {
    return (
        <AuthenticatedLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Dashboard
                </h2>
                <p className="mb-4">Welcome, {auth.user.nom}!</p>

                {session?.success && (
                    <div className="bg-green-500 text-white p-2 mb-4">
                        {session.success}
                    </div>
                )}

                {auth.user.role === "Client" && (
                    <div>
                        <div className="mb-4">
                            <Link
                                href={route("commandes.create")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Create New Order
                            </Link>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Your Orders
                        </h3>
                        {data.commandes?.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <ul>
                                {data.commandes.map((commande) => (
                                    <li
                                        key={commande.id}
                                        className="mb-4 p-4 border rounded"
                                    >
                                        <p>
                                            <strong>Pickup:</strong>{" "}
                                            {commande.adresse_envoi}
                                        </p>
                                        <p>
                                            <strong>Delivery:</strong>{" "}
                                            {commande.adresse_reception}
                                        </p>
                                        <p>
                                            <strong>Description:</strong>{" "}
                                            {commande.description_colis}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {commande.etat}
                                        </p>
                                        <Link
                                            href={route(
                                                "commandes.show",
                                                commande.id
                                            )}
                                            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                                        >
                                            Voir les détails
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {auth.user.role === "Livreur" && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            Assigned Deliveries
                        </h3>
                        {data.commandes?.length === 0 ? (
                            <p>No deliveries assigned.</p>
                        ) : (
                            <ul>
                                {data.commandes.map((commande) => (
                                    <li
                                        key={commande.id}
                                        className="mb-4 p-4 border rounded"
                                    >
                                        {commande.etat === "en cours" && (
                                            <form
                                                method="POST"
                                                action={route(
                                                    "commandes.livree",
                                                    commande.id
                                                )}
                                                className="mt-2"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="_token"
                                                    value={document
                                                        .querySelector(
                                                            'meta[name="csrf-token"]'
                                                        )
                                                        .getAttribute(
                                                            "content"
                                                        )}
                                                />
                                                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                                    Marquer comme livrée
                                                </button>
                                            </form>
                                        )}

                                        <p>
                                            <strong>Pickup:</strong>{" "}
                                            {commande.adresse_envoi}
                                        </p>
                                        <p>
                                            <strong>Delivery:</strong>{" "}
                                            {commande.adresse_reception}
                                        </p>
                                        <p>
                                            <strong>Description:</strong>{" "}
                                            {commande.description_colis}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {commande.etat}
                                        </p>

                                        {commande.livraison &&
                                            commande.etat === "en cours" && (
                                                <LivraisonPositionForm
                                                    livraisonId={
                                                        commande.livraison.id
                                                    }
                                                    initialValue={
                                                        commande.livraison
                                                            .position_actuelle
                                                    }
                                                />
                                            )}

                                        {/* Optionnel : afficher la position actuelle */}
                                        {commande.livraison && (
                                            <div className="text-sm text-gray-600 mt-1">
                                                <strong>
                                                    Position actuelle :
                                                </strong>{" "}
                                                {commande.livraison
                                                    .position_actuelle ||
                                                    "Non renseignée"}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {auth.user.role === "Admin" && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            All Orders
                        </h3>
                        {data.commandes?.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <ul>
                                {data.commandes.map((commande) => (
                                    <li
                                        key={commande.id}
                                        className="mb-4 p-4 border rounded"
                                    >
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {commande.etat}
                                        </p>
                                        {commande.etat === "à traiter" && (
                                            <AffectationForm
                                                livreurs={data.livreurs}
                                                commandeId={commande.id}
                                            />
                                        )}
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "commandes.destroy",
                                                commande.id
                                            )}
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        "Annuler cette commande ?"
                                                    )
                                                )
                                                    e.preventDefault();
                                            }}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Annuler
                                        </Link>

                                        <p>
                                            <strong>Client:</strong>{" "}
                                            {commande.client?.nom || "N/A"}
                                        </p>
                                        <p>
                                            <strong>Pickup:</strong>{" "}
                                            {commande.adresse_envoi}
                                        </p>
                                        <p>
                                            <strong>Delivery:</strong>{" "}
                                            {commande.adresse_reception}
                                        </p>
                                        <p>
                                            <strong>Description:</strong>{" "}
                                            {commande.description_colis}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {commande.etat}
                                        </p>
                                        <Link
                                            href={route(
                                                "commandes.suivi",
                                                commande.id
                                            )}
                                            className="text-blue-500 underline ml-2"
                                        >
                                            Suivi / Détail
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <h3 className="text-xl font-semibold mb-2 mt-6">
                            All Users
                        </h3>
                        {data.users?.length === 0 ? (
                            <p>No users found.</p>
                        ) : (
                            <ul>
                                {data.users.map((user) => {
                                    console.log("User:", user); // ✅ Debug

                                    const peutAfficherBouton =
                                        user.role === "Livreur" &&
                                        (user.statut === "actif" ||
                                            user.statut === "suspendu");

                                    return (
                                        <li
                                            key={user.id}
                                            className="mb-4 p-4 border rounded"
                                        >
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {user.nom} ({user.role})
                                            </p>
                                            <p>
                                                <strong>Email:</strong>{" "}
                                                {user.email}
                                            </p>
                                            <p>
                                                <strong>Statut:</strong>{" "}
                                                {user.statut}
                                            </p>

                                            {/* ✅ DEBUG */}
                                            <p className="text-sm italic text-gray-500">
                                                DEBUG statut: {user.statut}
                                            </p>

                                            {/* ✅ BOUTON */}
                                            {peutAfficherBouton && (
                                                <Link
                                                    href={route(
                                                        "users.toggleStatus",
                                                        user.id
                                                    )}
                                                    method="patch"
                                                    as="button"
                                                    type="button"
                                                    className={`mt-2 px-4 py-2 rounded text-white ${
                                                        user.statut === "actif"
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                `Voulez-vous vraiment ${
                                                                    user.statut ===
                                                                    "actif"
                                                                        ? "suspendre"
                                                                        : "activer"
                                                                } ce livreur ?`
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    {user.statut === "actif"
                                                        ? "Suspendre"
                                                        : "Activer"}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
