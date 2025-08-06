import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icons (sinon les markers sont invisibles !)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LivraisonMap({ position, historique }) {
  // position: "lat,lon"
  // historique: tableau [{position: "lat,lon", date: "..."}]

  if (!position) {
    return <div className="text-gray-500">Aucune position disponible</div>;
  }

  // Transforme "lat,lon" en tableau de float
  const parse = (str) =>
    str
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));

  const lastPos = parse(position);

  // Polyline pour l’historique
  const polyline =
    historique && historique.length > 0
      ? historique.map((h) => parse(h.position))
      : lastPos
      ? [lastPos]
      : [];

  return (
    <div style={{ height: "280px", width: "100%", marginBottom: "1rem" }}>
      <MapContainer
        center={lastPos}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Historique du trajet */}
        {polyline.length > 1 && <Polyline positions={polyline} color="blue" />}
        {/* Marqueur actuel */}
        <Marker position={lastPos}>
          <Popup>Position actuelle du livreur</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
