import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
  TruckIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    return () => reset('password');
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <Head title="Connexion – LivraisonPro" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-stretch">
        {/* Bandeau gauche (branding) */}
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
                Heureux de vous revoir
              </h1>
              <p className="mt-4 text-white/90">
                Connectez‑vous pour créer des commandes, suivre vos livraisons en temps réel
                et gérer votre activité en toute simplicité.
              </p>
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
                  Connexion
                </h2>
                <p className="mt-1 text-center text-gray-500 text-sm">
                  Accédez à votre espace LivraisonPro
                </p>

                {status && (
                  <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded px-3 py-2">
                    {status}
                  </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 px-3 py-2"
                      required
                      autoFocus
                    />
                    {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPwd ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 px-3 py-2 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((s) => !s)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                        aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      >
                        {showPwd ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Se souvenir de moi</span>
                    </label>

                    {canResetPassword && (
                      <Link
                        href={route('password.request')}
                        className="text-sm text-blue-700 hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2.5 shadow-lg transition disabled:opacity-60"
                  >
                    {processing ? 'Connexion…' : 'Se connecter'}
                  </button>

                  {/* Lien inscription */}
                  <div className="text-center text-sm text-gray-500">
                    Pas encore de compte ?{' '}
                    <span className="whitespace-nowrap">
                      <Link href={route('register.client')} className="text-blue-700 font-semibold hover:underline">
                        Client
                      </Link>{' '}
                      /{' '}
                      <Link href={route('register.livreur')} className="text-blue-700 font-semibold hover:underline">
                        Livreur
                      </Link>
                    </span>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-center text-xs text-gray-500">
                Sécurisé & chiffré — LivraisonPro © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
