import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth, data }) {
    return (
        <AuthenticatedLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
                <p className="mb-4">Welcome, {auth.user.nom}!</p>

                {auth.user.role === 'Client' && (
                    <div>
                        <div className="mb-4">
                            <Link
                                href={route('commandes.create')}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Create New Order
                            </Link>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Your Orders</h3>
                        {data.commandes.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <ul>
                                {data.commandes.map((commande) => (
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
                )}

                {auth.user.role === 'Livreur' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Assigned Deliveries</h3>
                        {data.commandes.length === 0 ? (
                            <p>No deliveries assigned.</p>
                        ) : (
                            <ul>
                                {data.commandes.map((commande) => (
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
                )}

                {auth.user.role === 'Admin' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">All Orders</h3>
                        {data.commandes.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <ul>
                                {data.commandes.map((commande) => (
                                    <li key={commande.id} className="mb-4 p-4 border rounded">
                                        <p><strong>Client:</strong> {commande.client?.nom || 'N/A'}</p>
                                        <p><strong>Pickup:</strong> {commande.adresse_envoi}</p>
                                        <p><strong>Delivery:</strong> {commande.adresse_reception}</p>
                                        <p><strong>Description:</strong> {commande.description_colis}</p>
                                        <p><strong>Status:</strong> {commande.etat}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <h3 className="text-xl font-semibold mb-2 mt-6">All Users</h3>
                        {data.users?.length ? (
                            <ul>
                                {data.users.map((user) => (
                                    <li key={user.id} className="mb-2">
                                        <p><strong>Name:</strong> {user.nom} ({user.role})</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}