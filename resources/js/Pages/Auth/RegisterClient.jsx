import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function RegisterClient() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        email: '',
        mot_de_passe: '',
        mot_de_passe_confirmation: '',
        adresse: '',
    });

    useEffect(() => {
        return () => {
            reset('mot_de_passe', 'mot_de_passe_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register.client.store'), {
            onError: (errors) => console.log('Registration errors:', errors),
            onSuccess: () => console.log('Registration successful'),
        });
    };

    return (
        <GuestLayout title="Inscription - Client">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Inscription Client</h2>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="nom" value="Nom" />
                        <TextInput
                            id="nom"
                            type="text"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            required
                        />
                        <InputError message={errors.nom} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="mot_de_passe" value="Mot de passe" />
                        <TextInput
                            id="mot_de_passe"
                            type="password"
                            value={data.mot_de_passe}
                            onChange={(e) => setData('mot_de_passe', e.target.value)}
                            required
                        />
                        <InputError message={errors.mot_de_passe} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="mot_de_passe_confirmation" value="Confirmer Mot de passe" />
                        <TextInput
                            id="mot_de_passe_confirmation"
                            type="password"
                            value={data.mot_de_passe_confirmation}
                            onChange={(e) => setData('mot_de_passe_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.mot_de_passe_confirmation} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="adresse" value="Adresse" />
                        <TextInput
                            id="adresse"
                            type="text"
                            value={data.adresse}
                            onChange={(e) => setData('adresse', e.target.value)}
                            required
                        />
                        <InputError message={errors.adresse} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton disabled={processing}>S'inscrire</PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}