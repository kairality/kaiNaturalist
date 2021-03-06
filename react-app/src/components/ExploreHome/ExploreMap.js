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
import { LatLngBounds } from "leaflet";
import Loader from "../Loader/Loader";

import "./ExploreMap.css"

export function ExploreSearch({ onPositionChanged }) {

      const map = useMapEvents({
        locationfound: (e) => {
          onPositionChanged(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
        moveend: (e) => {
          onPositionChanged(map.getCenter());
        },
      });
      useEffect(() => {
          if(!sessionStorage.getItem("explorePosition")) {
            map.locate();
          }
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
      animateZoom: true,
    });
    map.addControl(searchControl);
    map.on("geosearch/showlocation", handlePositionChange);
    return () => map.removeControl(searchControl);
  }, [map, onPositionChanged]);

  return null;
}

export default function ExploreMap({observations, onPositionChanged, showObservation, removeObservation, popup, explorePosition, setPopup, visibleMarkers}) {

  const additionalMarkers = Object.values(observations).map(obs => <ExploreMapMarker
            key={obs.id}
            observation={obs}
            showObservation={showObservation}
            removeObservation={removeObservation}
            isActive={obs.id === popup}
            setPopup={setPopup}
            visibleMarkers={visibleMarkers}
        />);

    // prevent map from wrapping
    const maxBounds = new LatLngBounds([-90, -180], [90, 180]);

  return (
    <MapContainer
      center={explorePosition}
      zoom={13}
      scrollWheelZoom={false}
      zoomAnimation={true}
      maxBounds={maxBounds}
      maxBoundsViscosity={0.75}
      minZoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />
      {additionalMarkers}
      <ExploreSearch onPositionChanged={onPositionChanged}/>
    </MapContainer>
  );
}
