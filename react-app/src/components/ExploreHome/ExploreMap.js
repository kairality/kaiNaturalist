import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "@monsonjeremy/react-leaflet";
import ObservationCard from "../ObservationCard/ObservationCard";
import { useSelector } from "react-redux";
import {useMapEvents, useMap } from "@monsonjeremy/react-leaflet";
import {OpenStreetMapProvider, GeoSearchControl} from "leaflet-geosearch";

export function ExploreSearch({ onPositionChanged }) {

      const map = useMapEvents({
        locationfound: (e) => {
          onPositionChanged(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
        dblclick: (e) => {
          const newPosition = e.latlng;
          onPositionChanged(newPosition);
        },
      });

      useEffect(() => {
          map.locate();
        }, [map]);

  useEffect(() => {
      const handlePositionChange = (e) => {
        const garbledLocation = e.location;
        const newPosition = { lat: garbledLocation.y, lng: garbledLocation.x };
        onPositionChanged(newPosition);
      };
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      style: "bar",
    });
    map.addControl(searchControl);
    map.on("geosearch/showlocation", handlePositionChange);
    return () => map.removeControl(searchControl);
  }, [map, onPositionChanged]);

  return null;
}

export default function ExploreMap({onPositionChanged}) {
  const observations = useSelector((state) => state.observations);

  const [explorePosition, setExplorePosition] = useState({ lat: 0, lng: 0 });

  const makeMarker = (obs) => {
    const position = { lat: obs.latitude, lng: obs.longitude };
    return (
      <CircleMarker
        center={position}
        size={3}
        color={"#f16f3a"}
        fillColor={"#f16f3a"}
        fillOpacity={0.8}
      >
        {" "}
        <Popup>
          <ObservationCard observation={obs} />
        </Popup>
      </CircleMarker>
    );
  };

  const additionalMarkers = Object.values(observations).map((obs) => makeMarker(obs));

  return (
    <MapContainer
      key={JSON.stringify(explorePosition)}
      center={{lat: 0, lng: 0}}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {additionalMarkers}
      <ExploreSearch onPositionChanged={onPositionChanged}/>
    </MapContainer>
  );
}
