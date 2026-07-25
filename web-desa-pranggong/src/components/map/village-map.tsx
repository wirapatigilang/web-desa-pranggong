"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import {
  categoryColors,
  categoryLabels,
  mapCenter,
  type LocationCategory,
  type VillageLocation,
} from "@/lib/village-locations";

// Pinpoint pakai divIcon berwarna per kategori (bukan marker PNG default) agar selaras identitas visual.
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

// Terbang ke lokasi terpilih (dari pencarian/daftar) dan buka popup-nya.
function MapController({
  focusId,
  locations,
  markerRefs,
}: {
  focusId: string | null;
  locations: VillageLocation[];
  markerRefs: React.RefObject<Record<string, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!focusId) return;
    const location = locations.find((item) => item.id === focusId);
    if (!location) return;
    map.flyTo([location.lat, location.lng], 17, { duration: 0.75 });
    markerRefs.current[focusId]?.openPopup();
  }, [focusId, locations, map, markerRefs]);

  return null;
}

export default function VillageMap({
  locations,
  focusId,
}: {
  locations: VillageLocation[];
  focusId: string | null;
}) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  return (
    <div className="relative isolate z-0 overflow-hidden rounded-2xl border border-moss-900/10 shadow-sm">
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
        <MapController
          focusId={focusId}
          locations={locations}
          markerRefs={markerRefs}
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={markerIcon(location.category)}
            ref={(instance) => {
              markerRefs.current[location.id] = instance;
            }}
          >
            <Popup>
              <span className="inline-block rounded-full bg-gold-600/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-600">
                {categoryLabels[location.category]}
              </span>
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
