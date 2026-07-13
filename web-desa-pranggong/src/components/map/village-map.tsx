"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {
  categoryColors,
  categoryLabels,
  mapCenter,
  villageLocations,
  type LocationCategory,
} from "@/lib/village-locations";

// Ikon default leaflet dihost sendiri di /public/leaflet agar tidak bergantung CDN eksternal.
function markerIcon(category: LocationCategory) {
  const color = categoryColors[category];
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:16px;
      height:16px;
      border-radius:9999px;
      background:${color};
      border:2px solid #fbf9f1;
      box-shadow:0 1px 4px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export default function VillageMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-moss-900/10 shadow-sm">
      <MapContainer
        center={mapCenter}
        zoom={15}
        scrollWheelZoom
        className="h-[420px] w-full sm:h-[520px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {villageLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={markerIcon(location.category)}
          >
            <Popup>
              <p className="font-mono text-[10px] uppercase tracking-wide text-moss-600">
                {categoryLabels[location.category]}
              </p>
              <p className="mt-1 font-semibold text-ink-900">{location.name}</p>
              <p className="mt-1 text-sm text-ink-900/70">{location.description}</p>
              {location.hours && (
                <p className="mt-1 text-xs text-ink-900/60">Jam: {location.hours}</p>
              )}
              {location.contact && (
                <p className="text-xs text-ink-900/60">Kontak: {location.contact}</p>
              )}
              {location.href && (
                <Link
                  href={location.href}
                  className="mt-2 inline-block text-xs font-medium text-moss-600 hover:underline"
                >
                  Lihat halaman program →
                </Link>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
