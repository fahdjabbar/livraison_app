import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
          remember: false,
    });
     useEffect(() => {
          return () => {
              setData('password', '');
          };
      }, []);

  const submit = (e) => {
    e.preventDefault();
    post('/login', {
        onError: (errors) => console.log('Login errors:', errors),
        onSuccess: () => console.log('Login successful'),
    });
};


    return (
         <GuestLayout title="Log in">
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                  <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                      <h2 className="text-2xl font-bold mb-6 text-center">Se Connecter</h2>
                      {status && <div className="mb-4 text-sm text-green-600">{status}</div>}
                      <form onSubmit={submit}>
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
                                  value={data.password}
                                  onChange={(e) => setData('password', e.target.value)}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  required
                              />
                              {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                          </div>

                          <div className="mb-4">
                              <label className="inline-flex items-center">
                                  <input
                                      type="checkbox"
                                      checked={data.remember}
                                      onChange={(e) => setData('remember', e.target.checked)}
                                      className="rounded border-gray-300"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                              </label>
                          </div>

                          <div className="flex items-center justify-between">
                              <button
                                  type="submit"
                                  disabled={processing}
                                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                  Connectez Vous
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </GuestLayout>
    );
}
