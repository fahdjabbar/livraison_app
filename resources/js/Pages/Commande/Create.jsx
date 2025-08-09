import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { MapPinIcon, CubeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        adresse_envoi: "",
        adresse_reception: "",
        description_colis: "",
        note: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("commandes.store"));
    };

    return (
        <AuthenticatedLayout title="Nouvelle commande">
            <div className="max-w-2xl mx-auto p-6">
                {/* Card principale */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-extrabold text-blue-800 text-center mb-6">
                        🚚 Créer une nouvelle commande
                    </h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Adresse d’envoi */}
                        <div>
                            <InputLabel htmlFor="adresse_envoi">
                                <span className="flex items-center gap-2">
                                    <MapPinIcon className="w-5 h-5 text-blue-500" />
                                    Adresse d’envoi
                                </span>
                            </InputLabel>
                            <TextInput
                                id="adresse_envoi"
                                type="text"
                                className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder="Ex : 123 Rue de Paris, Casablanca"
                                value={data.adresse_envoi}
                                onChange={(e) => setData("adresse_envoi", e.target.value)}
                                required
                            />
                            <InputError message={errors.adresse_envoi} />
                        </div>

                        {/* Adresse de réception */}
                        <div>
                            <InputLabel htmlFor="adresse_reception">
                                <span className="flex items-center gap-2">
                                    <MapPinIcon className="w-5 h-5 text-orange-500" />
                                    Adresse de réception
                                </span>
                            </InputLabel>
                            <TextInput
                                id="adresse_reception"
                                type="text"
                                className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200"
                                placeholder="Ex : 45 Avenue Mohammed VI, Rabat"
                                value={data.adresse_reception}
                                onChange={(e) => setData("adresse_reception", e.target.value)}
                                required
                            />
                            <InputError message={errors.adresse_reception} />
                        </div>

                        {/* Description du colis */}
                        <div>
                            <InputLabel htmlFor="description_colis">
                                <span className="flex items-center gap-2">
                                    <CubeIcon className="w-5 h-5 text-green-500" />
                                    Description du colis
                                </span>
                            </InputLabel>
                            <TextInput
                                id="description_colis"
                                type="text"
                                className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                placeholder="Ex : Documents, petit paquet, vêtement..."
                                value={data.description_colis}
                                onChange={(e) => setData("description_colis", e.target.value)}
                                required
                            />
                            <InputError message={errors.description_colis} />
                        </div>

                        {/* Note optionnelle */}
                        <div>
                            <InputLabel htmlFor="note">
                                <span className="flex items-center gap-2">
                                    <PencilSquareIcon className="w-5 h-5 text-gray-500" />
                                    Note (optionnel)
                                </span>
                            </InputLabel>
                            <TextInput
                                id="note"
                                type="text"
                                className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200"
                                placeholder="Informations supplémentaires..."
                                value={data.note}
                                onChange={(e) => setData("note", e.target.value)}
                            />
                            <InputError message={errors.note} />
                        </div>

                        {/* Bouton soumission */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-400 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
                            >
                                📦 Créer la commande
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
