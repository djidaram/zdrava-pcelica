import React from "react";

import dynamic from "next/dynamic";

const Map = ({ position }) => {
  const MapContainer = dynamic(
    () => import("react-leaflet").then((module) => module.MapContainer),
    { ssr: false }
  );
  const TileLayer = dynamic(
    () => import("react-leaflet").then((module) => module.TileLayer),
    { ssr: false }
  );
  const Marker = dynamic(
    () => import("react-leaflet").then((module) => module.Marker),
    { ssr: false }
  );

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
};

export default Map;
