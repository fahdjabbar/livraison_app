// resources/js/Components/AffectationForm.jsx
import React, { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
  UserIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function AffectationForm({ livreurs = [], commandeId }) {
  const { data, setData, post, processing, errors } = useForm({
    livreur_id: "",
  });
  const [query, setQuery] = useState("");

  const filteredLivreurs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return livreurs;
    return livreurs.filter(
      (l) =>
        (l.nom || "").toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q)
    );
  }, [livreurs, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.livreur_id) return;
    post(route("commandes.affecter", commandeId), { preserveScroll: true });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2">
          <TruckIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-gray-800">
            Affecter un livreur
          </h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
          Disponibles : {livreurs.length}
        </span>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Rechercher par nom ou email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Select stylé */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <select
            name="livreur_id"
            value={data.livreur_id}
            onChange={(e) => setData("livreur_id", e.target.value)}
            required
            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-3 py-2 pr-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">— Choisir un livreur —</option>
            {filteredLivreurs.length > 0 ? (
              filteredLivreurs.map((livreur) => (
                <option key={livreur.id} value={livreur.id}>
                  {livreur.nom} ({livreur.email})
                </option>
              ))
            ) : (
              <option disabled>Aucun résultat</option>
            )}
          </select>

          {/* Chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <button
          type="submit"
          disabled={processing || !data.livreur_id}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
            processing || !data.livreur_id
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-orange-400 text-white hover:from-blue-700 hover:to-orange-500"
          }`}
        >
          <CheckCircleIcon className="w-5 h-5" />
          Affecter
        </button>
      </div>

      {/* Hint + erreurs */}
      <div className="mt-2 flex items-start justify-between">
        <div className="text-xs text-gray-400">
          Seuls les livreurs <span className="font-semibold">actifs</span> sont
          listés.
        </div>
        {errors.livreur_id && (
          <span className="text-xs text-red-500">{errors.livreur_id}</span>
        )}
      </div>

      {/* Liste compacte (optionnelle) de contexte */}
      {query && filteredLivreurs.length > 0 && (
        <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <div className="text-xs font-semibold text-gray-600 mb-2">
            Résultats ({filteredLivreurs.length})
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredLivreurs.slice(0, 4).map((l) => (
              <li
                key={l.id}
                className={`flex items-center gap-2 rounded-lg bg-white border border-gray-100 px-3 py-2 text-xs ${
                  String(data.livreur_id) === String(l.id)
                    ? "ring-2 ring-blue-200"
                    : ""
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium text-gray-800">
                    {l.nom}
                  </div>
                  <div className="truncate text-gray-500">{l.email}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
