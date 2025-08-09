import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons (sinon markers invisibles en bundlers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/**
 * LivraisonMap
 * @param {string} position  - "lat,lon"
 * @param {Array<{position:string,date:string}>} historique
 * @param {number|string} height - hauteur px (default 320)
 */
export default function LivraisonMap({ position, historique = [], height = 320 }) {
  // Parsing robuste "lat,lon" -> [lat, lon]
  const parse = (str) => {
    if (!str || typeof str !== "string") return null;
    const [a, b] = str.split(",").map((v) => parseFloat(String(v).trim()));
    if (Number.isFinite(a) && Number.isFinite(b)) return [a, b];
    return null;
  };

  const lastPos = useMemo(() => parse(position), [position]);

  // Tableau de points [lat, lon] pour la polyline
  const path = useMemo(() => {
    const pts = [];
    if (Array.isArray(historique) && historique.length > 0) {
      for (const h of historique) {
        const p = parse(h?.position);
        if (p) pts.push(p);
      }
    }
    // Si pas d’historique mais position actuelle valide
    if (pts.length === 0 && lastPos) pts.push(lastPos);
    return pts;
  }, [historique, lastPos]);

  // Gestion “no data”
  if (!lastPos) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-4 text-center">
        <div className="mx-auto mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="text-gray-500 text-sm">Aucune position disponible</div>
      </div>
    );
  }

  // Composant interne pour fitBounds après rendu
  const FitBounds = ({ points }) => {
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      if (points.length >= 2) {
        const bounds = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])));
        map.fitBounds(bounds, { padding: [30, 30] });
      } else if (points.length === 1) {
        map.setView(points[0], 13);
      }
    }, [map, points]);
    return null;
  };

  // Dernier point (position actuelle)
  const current = lastPos;
  const start = path.length > 0 ? path[0] : null;

  return (
    <div className="relative">
      {/* Cadre futuriste */}
      <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-500/40 via-orange-400/40 to-blue-500/40">
        <div
          className="rounded-3xl bg-white/90 backdrop-blur shadow-xl border border-white/60 overflow-hidden"
          style={{ height: typeof height === "number" ? `${height}px` : height }}
        >
          <MapContainer
            center={current}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {/* Fit bounds automatique */}
            <FitBounds points={path} />

            {/* Trajet (polyline) */}
            {path.length > 1 && (
              <Polyline
                positions={path}
                pathOptions={{
                  color: "#2563EB", // blue-600
                  weight: 5,
                  opacity: 0.8,
                  lineJoin: "round",
                }}
              />
            )}

            {/* Point de départ (si historique) */}
            {start && (
              <CircleMarker
                center={start}
                radius={6}
                pathOptions={{ color: "#10B981", fillColor: "#10B981", fillOpacity: 0.9 }} // emerald-500
              />
            )}

            {/* Point actuel (marker classique) */}
            {current && (
              <Marker position={current}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Position actuelle</div>
                    {Array.isArray(historique) && historique.length > 0 && (
                      <div className="text-gray-500">
                        Dernière mise à jour : {historique[historique.length - 1]?.date || "—"}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Légende overlay */}
      <div className="pointer-events-none absolute right-3 top-3 space-y-1.5">
        <div className="pointer-events-auto rounded-full bg-white/90 shadow px-3 py-1 text-[11px] font-semibold text-gray-700 border border-gray-100">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-1.5 align-middle" />
          Départ
        </div>
        <div className="pointer-events-auto rounded-full bg-white/90 shadow px-3 py-1 text-[11px] font-semibold text-gray-700 border border-gray-100">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mr-1.5 align-middle" />
          Trajet
        </div>
        <div className="pointer-events-auto rounded-full bg-white/90 shadow px-3 py-1 text-[11px] font-semibold text-gray-700 border border-gray-100">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-800 mr-1.5 align-middle" />
          Actuelle
        </div>
      </div>
    </div>
  );
}
