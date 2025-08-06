import React from "react";
import { useForm } from "@inertiajs/react";

function AffectationForm({ livreurs, commandeId }) {
    const { data, setData, post, processing, errors } = useForm({
        livreur_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("commandes.affecter", commandeId));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
            <select
                name="livreur_id"
                value={data.livreur_id}
                onChange={e => setData("livreur_id", e.target.value)}
                required
                className="border rounded px-2 py-1"
            >
                <option value="">-- Choisir un livreur --</option>
                {livreurs.map(livreur => (
                    <option key={livreur.id} value={livreur.id}>
                        {livreur.nom} ({livreur.email})
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                disabled={processing}
            >
                Affecter
            </button>
            {errors.livreur_id && (
                <span className="text-red-500 text-xs">{errors.livreur_id}</span>
            )}
        </form>
    );
}

export default AffectationForm;
