import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function DashboardLivreur({ auth, commandes }) {
    return (
        <AuthenticatedLayout title="Dashboard - Livreur">
            <Head title="Dashboard - Livreur" />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
                <p className="mb-4">Welcome, {auth.user.nom}!</p>
                <h3 className="text-xl font-semibold mb-2">Assigned Deliveries</h3>
                {commandes.length === 0 ? (
                    <p>No deliveries assigned.</p>
                ) : (
                    <ul>
                        {commandes.map((commande) => (
                            <li key={commande.id} className="mb-4 p-4 border rounded">
                                <p><strong>Pickup:</strong> {commande.adresse_envoi}</p>
                                <p><strong>Delivery:</strong> {commande.adresse_reception}</p>
                                <p><strong>Description:</strong> {commande.description_colis}</p>
                                <p><strong>Status:</strong> {commande.etat}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
}