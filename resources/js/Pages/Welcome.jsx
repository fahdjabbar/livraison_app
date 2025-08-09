import { Head, Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useState } from "react";
import {
    PlusIcon,
    UserIcon,
    TruckIcon,
    PhoneIcon,
    MapPinIcon,
    CreditCardIcon,
    UsersIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaTiktok,
    FaLinkedin,
} from "react-icons/fa6";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { post } = useForm();
    const [showRegisterOptions, setShowRegisterOptions] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    const toggleRegisterOptions = (e) => {
        e.preventDefault();
        setShowRegisterOptions(!showRegisterOptions);
    };

    return (
        <>
            <Head title="Livraison App - Livraison rapide & fiable au Maroc" />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-100 font-sans">
                {/* Header/Navbar */}
                <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <TruckIcon className="w-6 h-6 text-blue-600" />
                            <span className="text-xl font-extrabold text-blue-700 tracking-tight">
                                Livraison
                                <span className="text-orange-400">Pro</span>
                            </span>
                        </div>

                        {/* NAV (desktop) */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                            <Link
                                href={route("welcome")}
                                className="hover:text-blue-700"
                            >
                                Accueil
                            </Link>
                            <a href="#about" className="hover:text-blue-700">
                                Qui sommes‑nous
                            </a>
                            <a href="#services" className="hover:text-blue-700">
                                Services
                            </a>
                            <a href="#how" className="hover:text-blue-700">
                                Comment ça marche ?
                            </a>
                            <a
                                href="#testimonials"
                                className="hover:text-blue-700"
                            >
                                Témoignages
                            </a>
                            <a href="#contact" className="hover:text-blue-700">
                                Contact
                            </a>
                        </nav>

                        {/* Actions (desktop) */}
                        <div className="hidden md:flex items-center gap-2">
                            {auth?.user ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        post(route("logout"));
                                    }}
                                    className="text-red-600 font-semibold hover:bg-red-100 px-4 py-1.5 rounded-full transition text-sm"
                                >
                                    Déconnexion
                                </button>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-blue-700 px-4 py-1.5 rounded-full border border-blue-500 hover:bg-blue-50 transition text-sm"
                                    >
                                        Se connecter
                                    </Link>

                                    {/* Dropdown Créer compte */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowRegisterOptions(
                                                    (s) => !s
                                                );
                                            }}
                                            className="bg-gradient-to-r from-blue-600 to-orange-400 px-5 py-1.5 text-white font-bold rounded-full flex items-center gap-2 shadow hover:scale-105 transition text-sm"
                                            aria-haspopup="menu"
                                            aria-expanded={showRegisterOptions}
                                        >
                                            <PlusIcon className="w-5 h-5" />
                                            Créer votre compte
                                        </button>
                                        {showRegisterOptions && (
                                            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
                                                <Link
                                                    href={route(
                                                        "register.client"
                                                    )}
                                                    className="flex items-center gap-2 px-5 py-3 text-gray-800 hover:bg-blue-50 rounded-t-2xl transition"
                                                    onClick={() =>
                                                        setShowRegisterOptions(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <UserIcon className="w-5 h-5 text-blue-500" />
                                                    <span>Client</span>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "register.livreur"
                                                    )}
                                                    className="flex items-center gap-2 px-5 py-3 text-gray-800 hover:bg-blue-50 rounded-b-2xl transition"
                                                    onClick={() =>
                                                        setShowRegisterOptions(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <UsersIcon className="w-5 h-5 text-orange-500" />
                                                    <span>Livreur</span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Burger (mobile) */}
                        <button
                            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label="Ouvrir le menu"
                        >
                            {/* Icône burger / close inline */}
                            <svg
                                className={`w-6 h-6 ${
                                    mobileOpen ? "hidden" : "block"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`w-6 h-6 ${
                                    mobileOpen ? "block" : "hidden"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Drawer mobile */}
                    <div
                        className={`md:hidden origin-top transition-all ${
                            mobileOpen
                                ? "scale-y-100 opacity-100"
                                : "scale-y-0 opacity-0"
                        } bg-white border-t border-gray-200`}
                    >
                        <nav className="px-4 py-3 flex flex-col gap-2 text-sm font-medium text-gray-700">
                            <Link
                                href={route("welcome")}
                                className="py-2 hover:text-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Accueil
                            </Link>
                            <a
                                href="#about"
                                className="py-2 hover:text-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Qui sommes‑nous
                            </a>
                            <a
                                href="#services"
                                className="py-2 hover:text-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Services
                            </a>
                            <a
                                href="#how"
                                className="py-2 hover:text-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Comment ça marche ?
                            </a>
                            <a
                                href="#testimonials"
                                className="py-2 hover:text-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Témoignages
                            </a>
                            <a
                                href="#contact"
                                className="py-2 hover:text-blue-700"
                                onClick={() => setMobileOpen(false)}
                            >
                                Contact
                            </a>

                            <div className="h-px bg-gray-200 my-2" />

                            {auth?.user ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileOpen(false);
                                        post(route("logout"));
                                    }}
                                    className="text-left text-red-600 font-semibold py-2"
                                >
                                    Déconnexion
                                </button>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="py-2 text-blue-700 font-semibold"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Se connecter
                                    </Link>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <Link
                                            href={route("register.client")}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-center gap-2 rounded-full border border-blue-500 text-blue-700 py-2"
                                        >
                                            <UserIcon className="w-4 h-4" />{" "}
                                            Client
                                        </Link>
                                        <Link
                                            href={route("register.livreur")}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-orange-400 text-white py-2"
                                        >
                                            <UsersIcon className="w-4 h-4" />{" "}
                                            Livreur
                                        </Link>
                                    </div>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col justify-center items-center relative pt-36 pb-12">
                    <div className="text-center space-y-6 max-w-2xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight drop-shadow-lg">
                            Livraison{" "}
                            <span className="text-orange-400">Rapide</span>{" "}
                            &amp; <span className="text-blue-500">Fiable</span>{" "}
                            au Maroc
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700/90 mt-2">
                            Simplifiez votre logistique : suivez, payez à la
                            livraison, restez serein.
                        </p>
                        <div className="mt-6 flex justify-center gap-6">
                            <Link
                                href={route("register.client")}
                                className="bg-blue-600 hover:bg-blue-700 px-7 py-3 text-white font-semibold rounded-full shadow-lg transition text-lg"
                            >
                                Je suis un Client
                            </Link>
                            <Link
                                href={route("register.livreur")}
                                className="bg-orange-400 hover:bg-orange-500 px-7 py-3 text-white font-semibold rounded-full shadow-lg transition text-lg"
                            >
                                Je suis un Livreur
                            </Link>
                        </div>
                    </div>
                    {/* Illustration livraison */}
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src="/img/illu_livraison.png"
                            alt="Illustration livraison"
                            className="max-h-80 md:max-h-[340px] w-auto object-contain opacity-90 drop-shadow-xl"
                            style={{ minWidth: 0, maxWidth: "100%" }}
                        />
                    </div>
                </main>

                {/* About */}
                <section id="about" className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                            Qui sommes-nous
                        </h2>
                        <p className="text-lg text-gray-600 text-center mb-2">
                            <b>LivraisonPro</b> est la nouvelle génération de
                            plateformes logistiques au Maroc. Notre mission :
                            rendre la livraison simple, rapide, sécurisée et
                            transparente, partout au Maroc.
                        </p>
                        <p className="text-center text-gray-500 text-base mt-2">
                            +1000 clients &amp; e-commerçants font confiance à
                            notre réseau de livreurs partenaires.
                        </p>
                    </div>
                </section>

                {/* Services */}
                <section
                    id="services"
                    className="py-20 bg-gradient-to-b from-blue-50 to-orange-50"
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
                            Nos services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-white shadow-xl rounded-2xl flex flex-col items-center hover:scale-105 hover:shadow-2xl transition">
                                <TruckIcon className="w-10 h-10 text-blue-600 mb-2" />
                                <h3 className="text-xl font-bold text-blue-900 mb-2">
                                    Livraison Express
                                </h3>
                                <p className="text-gray-600 text-center">
                                    24h/48h dans tout le Maroc, suivi en temps
                                    réel, réseau de pros.
                                </p>
                            </div>
                            <div className="p-8 bg-white shadow-xl rounded-2xl flex flex-col items-center hover:scale-105 hover:shadow-2xl transition">
                                <MapPinIcon className="w-10 h-10 text-orange-500 mb-2" />
                                <h3 className="text-xl font-bold text-blue-900 mb-2">
                                    Suivi géolocalisé
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Chaque étape visible pour le client et le
                                    livreur, historique précis.
                                </p>
                            </div>
                            <div className="p-8 bg-white shadow-xl rounded-2xl flex flex-col items-center hover:scale-105 hover:shadow-2xl transition">
                                <CreditCardIcon className="w-10 h-10 text-green-500 mb-2" />
                                <h3 className="text-xl font-bold text-blue-900 mb-2">
                                    Paiement à la livraison
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Sécurité totale : payez une fois livré, sans
                                    surprise.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="how" className="bg-white py-16">
                    <h2 className="text-2xl md:text-3xl text-blue-700 font-bold text-center mb-10">
                        Comment ça marche ?
                    </h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                                <PlusIcon className="w-8 h-8 text-blue-700" />
                            </div>
                            <div className="text-lg font-semibold text-gray-700 mb-1">
                                Créez votre commande
                            </div>
                            <div className="text-gray-500 text-center text-sm">
                                En 1 minute sur la plateforme
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                                <TruckIcon className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-lg font-semibold text-gray-700 mb-1">
                                Livreur affecté automatiquement
                            </div>
                            <div className="text-gray-500 text-center text-sm">
                                Suivi en temps réel
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                                <CreditCardIcon className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="text-lg font-semibold text-gray-700 mb-1">
                                Livraison & Paiement
                            </div>
                            <div className="text-gray-500 text-center text-sm">
                                Paiement à la livraison, satisfaction garantie
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="testimonials"
                    className="bg-gradient-to-r from-blue-50 to-orange-50 py-16"
                >
                    <h2 className="text-2xl md:text-3xl text-blue-700 font-bold text-center mb-8">
                        Ils nous font confiance
                    </h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <img
                                src="/img/user1.jpg"
                                alt="client 1"
                                className="w-12 h-12 rounded-full mb-3"
                            />
                            <p className="italic text-gray-700 text-center mb-2">
                                “Service rapide et fiable, je recommande !”
                            </p>
                            <div className="text-sm text-gray-500">
                                Sara, Casablanca
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <img
                                src="/img/user2.jpg"
                                alt="client 2"
                                className="w-12 h-12 rounded-full mb-3"
                            />
                            <p className="italic text-gray-700 text-center mb-2">
                                “Livraison suivie sur la carte, top !”
                            </p>
                            <div className="text-sm text-gray-500">
                                Yassine, Rabat
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <img
                                src="/img/user3.jpg"
                                alt="client 3"
                                className="w-12 h-12 rounded-full mb-3"
                            />
                            <p className="italic text-gray-700 text-center mb-2">
                                “Livreur très pro et courtois. Bravo !”
                            </p>
                            <div className="text-sm text-gray-500">
                                Samir, Marrakech
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
                            Contact
                        </h2>
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            <div className="flex flex-col items-center md:items-start">
                                <PhoneIcon className="w-8 h-8 text-blue-500 mb-2" />
                                <div className="text-lg text-gray-700 font-medium">
                                    +212 6 00 00 00 00
                                </div>
                                <div className="text-gray-500 text-sm">
                                    Lun-Sam 9h-19h
                                </div>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-500 mb-2" />
                                <div className="text-lg text-gray-700 font-medium">
                                    support@livraisonpro.ma
                                </div>
                                <div className="text-gray-500 text-sm">
                                    Réponse sous 24h
                                </div>
                            </div>
                        </div>
                        {/* Optionnel: Formulaire de contact */}
                        <form className="mt-10 bg-gray-50 rounded-xl shadow p-6 max-w-xl mx-auto space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 mb-1 font-semibold"
                                >
                                    Nom
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Votre nom"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 mb-1 font-semibold"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Votre email"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700 mb-1 font-semibold"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="3"
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Votre message..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                                disabled
                                title="Démonstration uniquement"
                            >
                                Envoyer
                            </button>
                        </form>
                        <div className="mt-4 text-center text-sm text-gray-400">
                            Ce formulaire est une démonstration (non relié au
                            backend)
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 mt-10 shadow-inner">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                        {/* Logo + Réseaux */}
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <span className="font-bold text-lg tracking-tight">
                                Livraison
                                <span className="text-orange-400">Pro</span>
                            </span>
                            {/* Réseaux Sociaux */}
                            <div className="flex gap-3 ml-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-blue-700 rounded-full p-2 hover:bg-blue-100 hover:text-blue-900 transition"
                                >
                                    <FaFacebookF className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-pink-500 rounded-full p-2 hover:bg-pink-100 hover:text-pink-700 transition"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://wa.me/212600000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-green-600 rounded-full p-2 hover:bg-green-100 hover:text-green-800 transition"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black rounded-full p-2 hover:bg-gray-200 hover:text-black transition"
                                >
                                    <FaTiktok className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-blue-600 rounded-full p-2 hover:bg-blue-200 hover:text-blue-900 transition"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <TruckIcon className="w-6 h-6 text-orange-400" />
                            <span className="font-bold text-lg tracking-tight">
                                Livraison
                                <span className="text-orange-400">Pro</span>
                            </span>
                        </div>
                        <div className="text-xs">
                            Laravel v{laravelVersion} &nbsp;|&nbsp; PHP v
                            {phpVersion} &nbsp;|&nbsp; ©{" "}
                            {new Date().getFullYear()} LivraisonPro. Tous droits
                            réservés.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
