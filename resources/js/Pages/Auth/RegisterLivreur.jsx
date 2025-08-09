import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
  TruckIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function RegisterLivreur() {
  const { data, setData, post, processing, errors, reset } = useForm({
    nom: '',
    email: '',
    password: '',
    password_confirmation: '',
    adresse: '',
    disponibilite: false,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
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
      disponibilite: data.disponibilite,
    };
    post(route('register.livreur.store'), {
      data: submissionData,
    });
  };

  return (
    <>
      <Head title="Inscription Livreur – LivraisonPro" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-stretch">
        {/* Bandeau gauche (branding livreur) */}
        <div className="hidden lg:flex w-[46%] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-400 opacity-90" />
          <div className="relative z-10 p-10 text-white flex flex-col justify-between w-full">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <TruckIcon className="w-8 h-8 text-white drop-shadow" />
              <span className="text-2xl font-extrabold tracking-tight">
                Livraison<span className="text-orange-200">Pro</span>
              </span>
            </div>

            {/* Accroche */}
            <div className="mt-10">
              <h1 className="text-3xl font-extrabold leading-tight drop-shadow-sm">
                Devenez livreur <br /> et gagnez plus
              </h1>
              <p className="mt-4 text-white/90">
                Rejoignez notre réseau et profitez d’opportunités de livraison fiables et bien rémunérées.
              </p>

              {/* Avantages livreur */}
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CurrencyDollarIcon className="w-6 h-6 flex-shrink-0" />
                  <span>Paiements rapides et sécurisés</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-6 h-6 flex-shrink-0" />
                  <span>Plateforme fiable & contrats transparents</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-6 h-6 flex-shrink-0" />
                  <span>Zones de livraison proches de chez vous</span>
                </li>
              </ul>
            </div>

            {/* Illustration */}
            <div className="mt-10">
              <img
                src="/img/illu_livreur.png"
                alt="Illustration livreur"
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
              href={route('welcome')}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Retour à l’accueil
            </Link>
            <div className="flex items-center gap-2 lg:hidden">
              <TruckIcon className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-extrabold text-blue-700">
                Livraison<span className="text-orange-400">Pro</span>
              </span>
            </div>
            <div />
          </div>

          {/* Contenu formulaire */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8">
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-extrabold text-blue-800 text-center">
                  Inscription Livreur
                </h2>
                <p className="mt-1 text-center text-gray-500 text-sm">
                  Créez votre compte et commencez à livrer
                </p>

                <form onSubmit={submit} className="mt-6 space-y-5">
                  {/* Nom */}
                  <div>
                    <InputLabel htmlFor="nom" value="Nom complet" />
                    <TextInput
                      id="nom"
                      type="text"
                      value={data.nom}
                      onChange={(e) => setData('nom', e.target.value)}
                      className="mt-1 block w-full"
                      required
                      autoFocus
                    />
                    <InputError message={errors.nom} className="mt-2" />
                  </div>

                  {/* Email */}
                  <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="mt-1 block w-full"
                      required
                    />
                    <InputError message={errors.email} className="mt-2" />
                  </div>

                  {/* Adresse */}
                  <div>
                    <InputLabel htmlFor="adresse" value="Adresse" />
                    <TextInput
                      id="adresse"
                      type="text"
                      name="adresse"
                      value={data.adresse}
                      onChange={(e) => setData('adresse', e.target.value)}
                      className="mt-1 block w-full"
                      required
                    />
                    <InputError message={errors.adresse} className="mt-2" />
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <div className="relative">
                      <TextInput
                        id="password"
                        type={showPwd ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((s) => !s)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPwd ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  {/* Confirmation */}
                  <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                    <div className="relative">
                      <TextInput
                        id="password_confirmation"
                        type={showPwd2 ? 'text' : 'password'}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="mt-1 block w-full pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd2((s) => !s)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPwd2 ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                  </div>

                  {/* Disponibilité */}
                  <div className="flex items-center gap-3">
                    <input
                      id="disponibilite"
                      type="checkbox"
                      checked={data.disponibilite}
                      onChange={(e) => setData('disponibilite', e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="disponibilite" className="text-gray-700">
                      Je suis disponible pour commencer immédiatement
                    </label>
                  </div>
                  <InputError message={errors.disponibilite} className="mt-2" />

                  <PrimaryButton disabled={processing} className="w-full justify-center">
                    {processing ? 'Inscription…' : "S'inscrire"}
                  </PrimaryButton>

                  <div className="text-center text-sm text-gray-500">
                    Vous avez déjà un compte ?{' '}
                    <Link href={route('login')} className="text-blue-700 font-semibold hover:underline">
                      Se connecter
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
