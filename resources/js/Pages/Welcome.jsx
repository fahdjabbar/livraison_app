import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline'; // Déjà installé

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { post } = useForm();
    const [showRegisterOptions, setShowRegisterOptions] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const toggleRegisterOptions = (e) => {
        e.preventDefault();
        setShowRegisterOptions(!showRegisterOptions);
    };

    return (
        <>
            <Head title="Livraison App" />
            <div className="min-h-screen bg-gray-100 font-sans">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="text-2xl font-bold text-gray-800">Livraison App</div>
                        <nav className="space-x-4">
                            <Link href={route('welcome')} className="text-gray-600 hover:text-gray-900">Accueil</Link>
                            <Link href="#about" className="text-gray-600 hover:text-gray-900">Qui sommes-nous</Link>
                            <Link href="#services" className="text-gray-600 hover:text-gray-900">Nos services</Link>
                            {auth?.user ? (
                                <a
                                    href="#"
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Déconnexion
                                </a>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Se connecter
                                    </Link>
                                    <div className="relative inline-block">
                                        <button
                                            onClick={toggleRegisterOptions}
                                            className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600 transition"
                                            aria-label="Créer votre compte"
                                        >
                                            <PlusIcon className="w-5 h-5 mr-1" />
                                            Créer votre compte
                                        </button>
                                        {showRegisterOptions && (
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50" // mt-2 pour placer en dessous
                                            >
                                                <Link
                                                    href={route('register.client')}
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setShowRegisterOptions(false)}
                                                >
                                                    Client
                                                </Link>
                                                <Link
                                                    href={route('register.livreur')}
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setShowRegisterOptions(false)}
                                                >
                                                    Livreur
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <div className="relative bg-blue-600 text-white text-center py-20">
                    <h1 className="text-4xl md:text-5xl font-bold">Livraison Rapide et Fiable au Maroc</h1>
                    <p className="mt-4 text-lg">Pour les livreurs et les clients, votre solution logistique tout-en-un.</p>
                </div>
                <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Qui sommes-nous</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Nous sommes Livraison App, une plateforme dédiée à offrir des services de livraison efficaces et sécurisés à travers le Maroc.
                    </p>
                </section>
                <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Nos services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow rounded-lg">
                            <h3 className="text-xl font-medium text-gray-800">Livraison Rapide</h3>
                            <p className="mt-2 text-gray-600">Livraison en 24h dans les grandes villes.</p>
                        </div>
                        <div className="p-6 bg-white shadow rounded-lg">
                            <h3 className="text-xl font-medium text-gray-800">Suivi en Temps Réel</h3>
                            <p className="mt-2 text-gray-600">Tracez vos colis à tout moment.</p>
                        </div>
                        <div className="p-6 bg-white shadow rounded-lg">
                            <h3 className="text-xl font-medium text-gray-800">Paiement à la Livraison</h3>
                            <p className="mt-2 text-gray-600">Option flexible pour les clients.</p>
                        </div>
                    </div>
                </section>
                <footer className="bg-gray-800 text-white text-center py-6">
                    <p>Laravel v{laravelVersion} (PHP v{phpVersion}) | © {new Date().getFullYear()} Livraison App</p>
                </footer>
            </div>
        </>
    );
}