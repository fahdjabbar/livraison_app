// resources/js/Components/LivraisonPositionForm.jsx
import { useForm } from "@inertiajs/react";
import React from "react";
import {
  MapPinIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function LivraisonPositionForm({ livraisonId, initialValue }) {
  const { data, setData, post, processing, errors } = useForm({
    position_actuelle: initialValue || "",
  });

  function autoGeoloc(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setData(
            "position_actuelle",
            `${pos.coords.latitude},${pos.coords.longitude}`
          );
        },
        (err) => {
          alert("Impossible de récupérer la position : " + err.message);
        }
      );
    } else {
      alert("Géolocalisation non supportée");
    }
  }

  function submit(e) {
    e.preventDefault();
    post(route("livraisons.position", livraisonId), { preserveScroll: true });
  }

  return (
    <form
      onSubmit={submit}
      className="w-full bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-4 mt-4"
    >
      {/* Titre */}
      <div className="flex items-center gap-2 mb-3">
        <MapPinIcon className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-bold text-gray-800">
          Mise à jour de ma position
        </h3>
      </div>

      {/* Champ position */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            name="position_actuelle"
            value={data.position_actuelle}
            onChange={(e) => setData("position_actuelle", e.target.value)}
            placeholder="Latitude,Longitude"
            required
            className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Auto-geoloc */}
        <button
          type="button"
          onClick={autoGeoloc}
          className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <CursorArrowRaysIcon className="w-4 h-4 text-orange-500" />
          Auto-Géo
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className={`inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition ${
            processing
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-orange-400 text-white hover:from-blue-700 hover:to-orange-500"
          }`}
        >
          {processing ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              Mise à jour…
            </>
          ) : (
            "Mettre à jour"
          )}
        </button>
      </div>

      {/* Erreurs */}
      {errors.position_actuelle && (
        <div className="mt-2 text-xs text-red-500">
          {errors.position_actuelle}
        </div>
      )}

      {/* Note */}
      <p className="mt-3 text-xs text-gray-400">
        La position est utilisée pour suivre la progression de la livraison en
        temps réel. Assurez-vous qu’elle soit précise.
      </p>
    </form>
  );
}
