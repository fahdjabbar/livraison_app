/*import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
          email: '',
          mot_de_passe: '',
          mot_de_passe_confirmation: '',
          adresse: '',
          role: 'Client',
          disponibilite: false,
    });
    useEffect(() => {
          return () => {
              setData('mot_de_passe', '');
              setData('mot_de_passe_confirmation', '');
          };
      }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onError: (errors) => console.log('Registration errors:', errors),
            onSuccess: () => console.log('Registration successful'),
        });
    };

    return (
     <GuestLayout title="Register">
                  <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                      <h2 className="text-2xl font-bold mb-6 text-center">Créer votre Compte</h2>
                      <form onSubmit={submit}>
                          <div className="mb-4">
                              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                              <input
                                  id="nom"
                                  type="text"
                                  value={data.nom}
                                  onChange={(e) => setData('nom', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              />
                              {errors.nom && <div className="text-red-600 text-sm mt-1">{errors.nom}</div>}
                          </div>

                          <div className="mb-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                              <input
                                  id="email"
                                  type="email"
                                  value={data.email}
                                  onChange={(e) => setData('email', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              />
                              {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                          </div>

                          <div className="mb-4">
                              <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                              <input
                                  id="mot_de_passe"
                                  type="password"
                                  value={data.mot_de_passe}
                                  onChange={(e) => setData('mot_de_passe', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              />
                              {errors.mot_de_passe && <div className="text-red-600 text-sm mt-1">{errors.mot_de_passe}</div>}
                          </div>

                          <div className="mb-4">
                              <label htmlFor="mot_de_passe_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                              <input
                                  id="mot_de_passe_confirmation"
                                  type="password"
                                  value={data.mot_de_passe_confirmation}
                                  onChange={(e) => setData('mot_de_passe_confirmation', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              />
                              {errors.mot_de_passe_confirmation && <div className="text-red-600 text-sm mt-1">{errors.mot_de_passe_confirmation}</div>}
                          </div>

                          <div className="mb-4">
                              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Address</label>
                              <input
                                  id="adresse"
                                  type="text"
                                  value={data.adresse}
                                  onChange={(e) => setData('adresse', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              />
                              {errors.adresse && <div className="text-red-600 text-sm mt-1">{errors.adresse}</div>}
                          </div>

                          <div className="mb-4">
                              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                              <select
                                  id="role"
                                  value={data.role}
                                  onChange={(e) => setData('role', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              >
                                  <option value="Client">Client</option>
                                  <option value="Livreur">Livreur</option>
                              </select>
                              {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
                          </div>

                          <div className="mb-4">
                              <label className="inline-flex items-center">
                                  <input
                                      type="checkbox"
                                      checked={data.disponibilite}
                                      onChange={(e) => setData('disponibilite', e.target.checked)}
                                      className="rounded border-gray-300"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">Available</span>
                              </label>
                              {errors.disponibilite && <div className="text-red-600 text-sm mt-1">{errors.disponibilite}</div>}
                          </div>

                          <div className="flex items-center justify-between">
                              <button
                                  type="submit"
                                  disabled={processing}
                                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                  Devenir Client 
                              </button>
                          </div>
                      </form>
                  </div>
          </GuestLayout>
    );
}*/
