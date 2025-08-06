// resources/js/Components/LivraisonPositionForm.jsx
import { useForm } from "@inertiajs/react";
import React from "react";

export default function LivraisonPositionForm({ livraisonId, initialValue }) {
    const { data, setData, post, processing, errors } = useForm({
        position_actuelle: initialValue || "",
    });

    function autoGeoloc(e) {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (pos) {
                    setData("position_actuelle", `${pos.coords.latitude},${pos.coords.longitude}`);
                },
                function (err) {
                    alert("Impossible de récupérer la position : " + err.message);
                }
            );
        } else {
            alert("Géolocalisation non supportée");
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route("livraisons.position", livraisonId));
    }

    return (
        <form onSubmit={submit} className="flex items-center gap-2 mt-2">
            <input
                type="text"
                name="position_actuelle"
                value={data.position_actuelle}
                onChange={e => setData("position_actuelle", e.target.value)}
                placeholder="Ma position (lat,lon)"
                required
                className="border rounded px-2 py-1"
            />
            <button
                type="button"
                onClick={autoGeoloc}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
            >
                Auto-Géoloc
            </button>
            <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                disabled={processing}
            >
                {processing ? "Mise à jour..." : "Mettre à jour"}
            </button>
            {errors.position_actuelle && (
                <span className="text-red-500">{errors.position_actuelle}</span>
            )}
        </form>
    );
}
