import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FunnelIcon, CheckCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function RetoursIndex({ retours, filters, stats }) {
  const { props } = usePage();
  const [local, setLocal] = useState({
    status: filters?.status || "",
    q: filters?.q || "",
    from: filters?.from || "",
    to: filters?.to || "",
  });

  useEffect(() => {
    setLocal({
      status: filters?.status || "",
      q: filters?.q || "",
      from: filters?.from || "",
      to: filters?.to || "",
    });
  }, [filters]);

  function applyFilters(e) {
    e?.preventDefault();
    router.get(route("retours.index"), local, { preserveState: true, replace: true });
  }

  function resetFilters() {
    setLocal({ status: "", q: "", from: "", to: "" });
    router.get(route("retours.index"), {}, { preserveState: true, replace: true });
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header + Actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-blue-800">Bons de retour</h1>
        <div className="flex items-center gap-2">
          <Link
            href={route('retours.export', local)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-white border hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export CSV
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Kpi label="En attente" value={stats.en_attente} tone="amber" />
        <Kpi label="Validés" value={stats.valide} tone="emerald" />
        <Kpi label="Rejetés" value={stats.rejete} tone="rose" />
        <Kpi label="Total" value={stats.total} tone="blue" />
      </div>

      {/* Filtres */}
      <form onSubmit={applyFilters} className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <div className="font-semibold text-gray-700">Filtres</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={local.status}
            onChange={(e) => setLocal({ ...local, status: e.target.value })}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="valide">Validé</option>
            <option value="rejete">Rejeté</option>
          </select>

          <input
            type="text"
            placeholder="Recherche (client, livreur, adresse, motif...)"
            value={local.q}
            onChange={(e) => setLocal({ ...local, q: e.target.value })}
            className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
          />

          <input
            type="date"
            value={local.from}
            onChange={(e) => setLocal({ ...local, from: e.target.value })}
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={local.to}
            onChange={(e) => setLocal({ ...local, to: e.target.value })}
            className="border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Appliquer
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
          >
            Réinitialiser
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <Th>#</Th>
              <Th>Commande</Th>
              <Th>Client</Th>
              <Th>Livreur</Th>
              <Th>Motif</Th>
              <Th>Commentaire</Th>
              <Th>Statut</Th>
              <Th>Déclaré le</Th>
              <Th>Confirmé le</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {retours.data.length === 0 && (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-400">
                  Aucun retour trouvé.
                </td>
              </tr>
            )}

            {retours.data.map((r) => (
              <tr key={r.id} className="border-t">
                <Td>{r.id}</Td>
                <Td>
                  <Link
                    href={route('commandes.suivi', r.commande_id)}
                    className="text-blue-600 hover:underline"
                  >
                    #{r.commande_id}
                  </Link>
                </Td>
                <Td>
                  {r.commande?.client
                    ? `${r.commande.client.nom} <${r.commande.client.email}>`
                    : '—'}
                </Td>
                <Td>
                  {r.livreur ? `${r.livreur.nom} <${r.livreur.email}>` : '—'}
                </Td>
                <Td className="capitalize">{r.motif.replace('_', ' ')}</Td>
                <Td title={r.commentaire || ''}>
                  {r.commentaire ? r.commentaire.slice(0, 40) + (r.commentaire.length > 40 ? '…' : '') : '—'}
                </Td>
                <Td>
                  <Badge status={r.statut} />
                </Td>
                <Td>{r.created_at ? new Date(r.created_at).toLocaleString() : '—'}</Td>
                <Td>{r.confirme_at ? new Date(r.confirme_at).toLocaleString() : '—'}</Td>
                <Td>
                  {r.statut === 'en_attente' ? (
                    <Link
                      href={route('retours.confirmer', r.id)}
                      method="post"
                      as="button"
                      className="inline-flex items-center gap-1 bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700"
                      onClick={(e) => {
                        if (!confirm('Confirmer ce retour ?')) e.preventDefault();
                      }}
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      Confirmer
                    </Link>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination simple */}
      <div className="mt-4 flex justify-end gap-2">
        {retours.links?.map((l, i) => (
          <Link
            key={i}
            href={l.url || '#'}
            className={`px-3 py-1.5 rounded text-sm border ${l.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}
            dangerouslySetInnerHTML={{ __html: l.label }}
          />
        ))}
      </div>
    </div>
  );
}

function Kpi({ label, value, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    rose: 'bg-rose-50 text-rose-700',
  };
  return (
    <div className={`rounded-xl border bg-white p-4`}>
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`mt-1 inline-flex items-center gap-2 px-2 py-1 rounded ${tones[tone]}`}>
        <span className="text-lg font-extrabold">{value}</span>
      </div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    en_attente: 'bg-amber-100 text-amber-700',
    valide: 'bg-emerald-100 text-emerald-700',
    rejete: 'bg-rose-100 text-rose-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function Th({ children }) {
  return <th className="text-left font-semibold p-3 text-xs uppercase tracking-wide">{children}</th>;
}
function Td({ children, className = '' }) {
  return <td className={`p-3 align-top ${className}`}>{children}</td>;
}
