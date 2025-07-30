import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        adresse_envoi: '',
        adresse_reception: '',
        description_colis: '',
        note: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('commandes.store'));
    };

    return (
        <AuthenticatedLayout title="Create Order">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Order</h2>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="adresse_envoi">Pickup Address</InputLabel>
                        <TextInput
                            id="adresse_envoi"
                            type="text"
                            value={data.adresse_envoi}
                            onChange={(e) => setData('adresse_envoi', e.target.value)}
                            required
                        />
                        <InputError message={errors.adresse_envoi} />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="adresse_reception">Delivery Address</InputLabel>
                        <TextInput
                            id="adresse_reception"
                            type="text"
                            value={data.adresse_reception}
                            onChange={(e) => setData('adresse_reception', e.target.value)}
                            required
                        />
                        <InputError message={errors.adresse_reception} />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="description_colis">Package Description</InputLabel>
                        <TextInput
                            id="description_colis"
                            type="text"
                            value={data.description_colis}
                            onChange={(e) => setData('description_colis', e.target.value)}
                            required
                        />
                        <InputError message={errors.description_colis} />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="note">Note (Optional)</InputLabel>
                        <TextInput
                            id="note"
                            type="text"
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                        />
                        <InputError message={errors.note} />
                    </div>

                    <div className="flex items-center justify-between">
                        <PrimaryButton disabled={processing}>
                            Create Order
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}