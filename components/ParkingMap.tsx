"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

/** ホテルシルク・トゥリー名古屋（駐車場は2025年2月末で廃止、周辺駐車場をご利用ください） */
const PARKING_SPOTS = [
  { id: "P1", lat: 35.1708, lng: 136.8995, name: "ホテルシルク・トゥリー名古屋", isHotel: true },
] as const;

const CENTER: [number, number] = [35.1708, 136.8995];
const ZOOM = 17;

/** 円形のピン用アイコン（P1=赤、P2〜P5=青） */
function createPinIcon(label: string, isHotel: boolean) {
  const bg = isHotel ? "#dc2626" : "#2563eb"; // red-600 / blue-600
  return L.divIcon({
    className: "parking-pin",
    html: `<span style="
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%;
      background: ${bg}; color: white; font-size: 12px; font-weight: 700;
      border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    ">${label.replace("P", "")}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    if (PARKING_SPOTS.length === 1) {
      map.setView([PARKING_SPOTS[0].lat, PARKING_SPOTS[0].lng], 17);
    } else {
      const bounds = L.latLngBounds(PARKING_SPOTS.map((s) => [s.lat, s.lng]));
      bounds.pad(0.15);
      map.fitBounds(bounds, { maxZoom: 17 });
    }
  }, [map]);
  return null;
}

export default function ParkingMap() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
      <div className="w-full h-[280px] min-h-[240px]" style={{ zIndex: 0 }}>
        <MapContainer
          center={CENTER}
          zoom={ZOOM}
          className="h-full w-full rounded-t-lg"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <FitBounds />
          {PARKING_SPOTS.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={createPinIcon(spot.id, spot.isHotel)}
            >
              <Popup>{spot.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* 凡例（友達のUIに合わせる） */}
      <div className="bg-white px-3 py-2.5 border-t border-gray-200 rounded-b-lg">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
          {PARKING_SPOTS.map((spot) => (
            <div key={spot.id} className="flex items-center gap-1.5">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: spot.isHotel ? "#dc2626" : "#2563eb" }}
              >
                {spot.id.replace("P", "")}
              </span>
              <span className="truncate max-w-[140px] sm:max-w-none">{spot.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
