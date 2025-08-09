import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AffectationForm from "@/Components/AffectationForm";
import LivraisonPositionForm from "@/Components/LivraisonPositionForm";
import {
  TruckIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth, data = {}, session }) {
  const role = (auth?.user?.role || "").toLowerCase();
  const commandes = data.commandes || [];
  const users = data.users || [];
  const livreursActifs = (data.livreurs || []).length;

  const countByEtat = (list, etat) => list.filter(c => c.etat === etat).length;

  const kpisClient = [
    { label: "À traiter", value: countByEtat(commandes, "à traiter"), icon: InboxIcon },
    { label: "En cours", value: countByEtat(commandes, "en cours"), icon: ClockIcon },
    { label: "Livrées", value: countByEtat(commandes, "livrée"), icon: CheckCircleIcon },
    { label: "Annulées", value: countByEtat(commandes, "annulée"), icon: XCircleIcon },
  ];

  const kpisLivreur = [
    { label: "En cours", value: countByEtat(commandes, "en cours"), icon: ClockIcon },
    { label: "Livrées", value: countByEtat(commandes, "livrée"), icon: CheckCircleIcon },
  ];

  const kpisAdmin = [
    { label: "Total commandes", value: commandes.length, icon: TruckIcon },
    { label: "À traiter", value: countByEtat(commandes, "à traiter"), icon: InboxIcon },
    { label: "En cours", value: countByEtat(commandes, "en cours"), icon: ClockIcon },
    { label: "Livreurs actifs", value: livreursActifs, icon: UserGroupIcon },
  ];

  const badge = (etat) => {
    const map = {
      "à traiter": "bg-amber-100 text-amber-800 ring-amber-200",
      "en cours": "bg-blue-100 text-blue-800 ring-blue-200",
      "livrée": "bg-emerald-100 text-emerald-800 ring-emerald-200",
      "annulée": "bg-rose-100 text-rose-800 ring-rose-200",
    };
    const cls = map[etat] || "bg-gray-100 text-gray-700 ring-gray-200";
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${cls}`}>
        {etat}
      </span>
    );
  };

  const EmptyState = ({ title, subtitle, icon: Icon = InboxIcon, cta }) => (
    <div className="text-center py-12 border-2 border-dashed rounded-xl bg-white">
      <Icon className="w-10 h-10 text-gray-400 mx-auto" />
      <h4 className="mt-3 text-gray-800 font-semibold">{title}</h4>
      <p className="text-gray-500 text-sm">{subtitle}</p>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );

  const CardCommande = ({ c, children }) => (
    <li className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="text-sm text-gray-500">Commande #{c.id}</div>
          <div className="flex items-center gap-2">
            {badge(c.etat)}
            <span className="text-xs text-gray-400">créée {new Date(c.created_at || c.date_creation).toLocaleString()}</span>
          </div>
        </div>
        <TruckIcon className="w-6 h-6 text-blue-500 shrink-0" />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="text-sm">
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <div className="text-gray-500">Envoi</div>
              <div className="font-medium text-gray-800">{c.adresse_envoi}</div>
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <div className="text-gray-500">Réception</div>
              <div className="font-medium text-gray-800">{c.adresse_reception}</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 text-sm text-gray-600">
          <span className="text-gray-500">Description: </span>{c.description_colis}
        </div>
        {c.livreur && (
          <div className="md:col-span-2 text-sm">
            <span className="text-gray-500">Livreur: </span>
            <span className="inline-flex items-center gap-1 font-medium text-gray-800">
              <UserIcon className="w-4 h-4 text-gray-400" />
              {c.livreur?.nom} <span className="text-gray-500">({c.livreur?.email})</span>
            </span>
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={route("commandes.suivi", c.id)}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          Suivi / Détail →
        </Link>
      </div>
    </li>
  );

  return (
    <AuthenticatedLayout title="Dashboard">
      <Head title="Dashboard" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-blue-800">Bonjour, {auth.user.nom}</h2>
            <p className="text-sm text-gray-500">
              Espace {role === "admin" ? "administrateur" : role}.
            </p>
          </div>
          {session?.success && (
            <div className="rounded-full bg-emerald-100 text-emerald-700 px-4 py-1.5 text-sm shadow">
              {session.success}
            </div>
          )}
        </div>

        {/* CLIENT */}
        {role === "client" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {kpisClient.map((k, idx) => (
                <div key={idx} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-700">{k.value}</div>
                      <div className="text-xs text-gray-500">{k.label}</div>
                    </div>
                    <k.icon className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Link
                href={route("commandes.create")}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow"
              >
                <TruckIcon className="w-5 h-5" />
                Créer une commande
              </Link>
            </div>

            {/* Liste commandes */}
            <div className="bg-gradient-to-b from-blue-50/40 to-transparent rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Mes commandes</h3>
              {commandes.length === 0 ? (
                <EmptyState
                  title="Aucune commande pour le moment"
                  subtitle="Créez votre première commande pour commencer."
                  icon={InboxIcon}
                  cta={
                    <Link
                      href={route("commandes.create")}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow"
                    >
                      <TruckIcon className="w-5 h-5" />
                      Nouvelle commande
                    </Link>
                  }
                />
              ) : (
                <ul className="grid grid-cols-1 gap-4">
                  {commandes.map((c) => (
                    <CardCommande key={c.id} c={c} />
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* LIVREUR */}
        {role === "livreur" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {kpisLivreur.map((k, idx) => (
                <div key={idx} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-700">{k.value}</div>
                      <div className="text-xs text-gray-500">{k.label}</div>
                    </div>
                    <k.icon className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-b from-blue-50/40 to-transparent rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Mes livraisons</h3>
              {commandes.length === 0 ? (
                <EmptyState
                  title="Aucune livraison assignée"
                  subtitle="Vous verrez vos missions ici dès qu’elles vous seront affectées."
                  icon={TruckIcon}
                />
              ) : (
                <ul className="grid grid-cols-1 gap-4">
                  {commandes.map((c) => (
                    <CardCommande key={c.id} c={c}>
                      {/* Actions livreur */}
                      {c.etat === "en cours" && (
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <form
                            method="POST"
                            action={route("commandes.livree", c.id)}
                            className="inline"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              value={
                                document
                                  .querySelector('meta[name="csrf-token"]')
                                  ?.getAttribute("content") ?? ""
                              }
                            />
                            <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-sm shadow">
                              <CheckCircleIcon className="w-4 h-4" />
                              Marquer livrée
                            </button>
                          </form>

                          <LivraisonPositionForm
                            livraisonId={c.livraison?.id}
                            initialValue={c.livraison?.position_actuelle}
                          />
                        </div>
                      )}

                      {c.livraison && (
                        <div className="text-xs text-gray-500 mt-2">
                          Dernière position:{" "}
                          <span className="font-medium text-gray-700">
                            {c.livraison.position_actuelle || "Non renseignée"}
                          </span>
                        </div>
                      )}
                    </CardCommande>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {kpisAdmin.map((k, idx) => (
                <div key={idx} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-700">{k.value}</div>
                      <div className="text-xs text-gray-500">{k.label}</div>
                    </div>
                    <k.icon className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Commandes */}
            <div className="bg-gradient-to-b from-blue-50/40 to-transparent rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Toutes les commandes</h3>
              {commandes.length === 0 ? (
                <EmptyState
                  title="Aucune commande pour le moment"
                  subtitle="Les nouvelles commandes apparaîtront ici."
                />
              ) : (
                <ul className="grid grid-cols-1 gap-4">
                  {commandes.map((c) => (
                    <CardCommande key={c.id} c={c}>
                      <div className="flex flex-wrap items-center gap-3">
                        {c.etat === "à traiter" && (
                          <AffectationForm
                            commandeId={c.id}
                            livreurs={data.livreurs || []}
                          />
                        )}

                        {c.etat === "à traiter" && (
                          <Link
                            as="button"
                            method="delete"
                            href={route("commandes.destroy", c.id)}
                            onClick={(e) => {
                              if (!confirm("Annuler cette commande ?")) e.preventDefault();
                            }}
                            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-full text-sm shadow"
                          >
                            <XCircleIcon className="w-4 h-4" />
                            Annuler
                          </Link>
                        )}
                      </div>
                    </CardCommande>
                  ))}
                </ul>
              )}
            </div>

            {/* Utilisateurs */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Utilisateurs</h3>
              {users.length === 0 ? (
                <EmptyState
                  title="Aucun utilisateur"
                  subtitle="Les utilisateurs créés apparaîtront ici."
                  icon={UserGroupIcon}
                />
              ) : (
                <ul className="divide-y divide-gray-100">
                  {users.map((u) => {
                    const estLivreur = (u.role || "").toLowerCase() === "livreur";
                    const peutAfficherBouton = estLivreur && (u.statut === "actif" || u.statut === "suspendu");
                    return (
                      <li key={u.id} className="py-3 flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-800">
                            {u.nom} <span className="text-gray-400">({u.role})</span>
                          </div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                          <div className="text-xs mt-1">
                            Statut:{" "}
                            <span className={`px-2 py-0.5 rounded-full text-[11px] ring-1 ring-inset ${
                              u.statut === "actif"
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                : u.statut === "suspendu"
                                ? "bg-amber-50 text-amber-700 ring-amber-200"
                                : "bg-gray-50 text-gray-700 ring-gray-200"
                            }`}>
                              {u.statut}
                            </span>
                          </div>
                        </div>

                        {peutAfficherBouton && (
                          <Link
                            href={route("users.toggleStatus", u.id)}
                            method="patch"
                            as="button"
                            type="button"
                            className={`px-3 py-1.5 rounded-full text-white text-sm shadow ${
                              u.statut === "actif"
                                ? "bg-rose-600 hover:bg-rose-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                            onClick={(e) => {
                              if (!confirm(`Voulez-vous vraiment ${u.statut === "actif" ? "suspendre" : "activer"} ce livreur ?`)) {
                                e.preventDefault();
                              }
                            }}
                          >
                            {u.statut === "actif" ? "Suspendre" : "Activer"}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
