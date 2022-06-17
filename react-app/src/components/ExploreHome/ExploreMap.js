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
import ExploreMapMarker from "./ExploreMapMarker";

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

export default function ExploreMap({observations, onPositionChanged, showObservation, removeObservation, popup, explorePosition, setPopup}) {

  const additionalMarkers = Object.values(observations).map(obs => <ExploreMapMarker
            observation={obs}
            showObservation={showObservation}
            removeObservation={removeObservation}
            isActive={obs.id === popup}
            setPopup={setPopup}
        />);


  return (
    <MapContainer
      key={JSON.stringify(explorePosition)}
      center={explorePosition}
      zoom={5}
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
