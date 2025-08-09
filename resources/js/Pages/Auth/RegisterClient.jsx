import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    TruckIcon,
    ArrowLeftIcon,
    ShieldCheckIcon,
    ClockIcon,
    CheckCircleIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function RegisterClient() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: "",
        email: "",
        password: "",
        password_confirmation: "",
        adresse: "",
    });

    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const submissionData = {
            nom: data.nom,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            adresse: data.adresse,
        };
        post(route("register.client.store"), {
            data: submissionData,
        });
    };

    return (
        <>
            <Head title="Inscription Client – LivraisonPro" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-stretch">
                {/* Bandeau gauche (branding / bénéfices) */}
                <div className="hidden lg:flex w-[46%] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-400 opacity-90" />
                    <div className="relative z-10 p-10 text-white flex flex-col justify-between w-full">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <TruckIcon className="w-8 h-8 text-white drop-shadow" />
                            <span className="text-2xl font-extrabold tracking-tight">
                                Livraison
                                <span className="text-orange-200">Pro</span>
                            </span>
                        </div>

                        {/* Accroche */}
                        <div className="mt-10">
                            <h1 className="text-3xl font-extrabold leading-tight drop-shadow-sm">
                                Rejoignez la plateforme <br /> de livraison
                                nouvelle génération
                            </h1>
                            <p className="mt-4 text-white/90">
                                Commandez, suivez en temps réel, et payez à la
                                livraison. Simple, rapide, fiable – partout au
                                Maroc.
                            </p>

                            {/* Points clés */}
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-start gap-3">
                                    <ShieldCheckIcon className="w-6 h-6 flex-shrink-0" />
                                    <span>
                                        Livraison sécurisée & livreurs vérifiés
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ClockIcon className="w-6 h-6 flex-shrink-0" />
                                    <span>
                                        Suivi temps réel & notifications
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
                                    <span>
                                        Paiement à la livraison, sans surprise
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Illustration (optionnelle) */}
                        <div className="mt-10">
                            <img
                                src="/img/illu_livraison.png"
                                alt="Illustration livraison"
                                className="max-h-52 w-auto object-contain opacity-95 drop-shadow-xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    {/* Blobs décoratifs */}
                    <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -top-20 -left-16 w-64 h-64 bg-orange-200/30 rounded-full blur-2xl" />
                </div>

                {/* Colonne droite (formulaire) */}
                <div className="flex-1 flex flex-col">
                    {/* Topbar minimal */}
                    <div className="h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
                        <Link
                            href={route("welcome")}
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à l’accueil
                        </Link>
                        <div className="flex items-center gap-2 lg:hidden">
                            <TruckIcon className="w-6 h-6 text-blue-600" />
                            <span className="text-lg font-extrabold text-blue-700">
                                Livraison
                                <span className="text-orange-400">Pro</span>
                            </span>
                        </div>
                        <div />
                    </div>

                    {/* Contenu formulaire */}
                    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8">
                        <div className="w-full max-w-md">
                            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-100">
                                <h2 className="text-2xl font-extrabold text-blue-800 text-center">
                                    Inscription Client
                                </h2>
                                <p className="mt-1 text-center text-gray-500 text-sm">
                                    Créez votre compte pour commencer à expédier
                                    vos colis
                                </p>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-5"
                                >
                                    {/* Nom */}
                                    <div>
                                        <InputLabel
                                            htmlFor="nom"
                                            value="Nom complet"
                                        />
                                        <TextInput
                                            id="nom"
                                            type="text"
                                            value={data.nom}
                                            onChange={(e) =>
                                                setData("nom", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            required
                                            autoFocus
                                        />
                                        <InputError
                                            message={errors.nom}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Adresse */}
                                    <div>
                                        <InputLabel
                                            htmlFor="adresse"
                                            value="Adresse"
                                        />
                                        <TextInput
                                            id="adresse"
                                            type="text"
                                            value={data.adresse}
                                            onChange={(e) =>
                                                setData(
                                                    "adresse",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            message={errors.adresse}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Mot de passe"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={
                                                    showPwd
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPwd((s) => !s)
                                                }
                                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                                aria-label={
                                                    showPwd
                                                        ? "Masquer le mot de passe"
                                                        : "Afficher le mot de passe"
                                                }
                                            >
                                                {showPwd ? (
                                                    <EyeSlashIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Confirmation */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirmer le mot de passe"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password_confirmation"
                                                type={
                                                    showPwd2
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPwd2((s) => !s)
                                                }
                                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                                aria-label={
                                                    showPwd2
                                                        ? "Masquer le mot de passe"
                                                        : "Afficher le mot de passe"
                                                }
                                            >
                                                {showPwd2 ? (
                                                    <EyeSlashIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <PrimaryButton
                                        disabled={processing}
                                        className="w-full justify-center"
                                    >
                                        {processing
                                            ? "Inscription…"
                                            : "S'inscrire"}
                                    </PrimaryButton>

                                    <div className="text-center text-sm text-gray-500">
                                        Vous avez déjà un compte ?{" "}
                                        <Link
                                            href={route("login")}
                                            className="text-blue-700 font-semibold hover:underline"
                                        >
                                            Se connecter
                                        </Link>
                                    </div>
                                </form>
                            </div>

                            {/* Bandeau de confiance */}
                            <div className="mt-6 text-center text-xs text-gray-500">
                                En continuant, vous acceptez nos conditions
                                d’utilisation et notre politique de
                                confidentialité.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
