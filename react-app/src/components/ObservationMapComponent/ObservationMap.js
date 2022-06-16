import React, { useEffect } from "react";
import {MapContainer, TileLayer, Marker, Popup, CircleMarker } from "@monsonjeremy/react-leaflet";
import ObservationCard from "../ObservationCard/ObservationCard";
import { useSelector } from "react-redux";

export default function ObservationMap({observation}) {
    const observations = useSelector(state => state.observations);
    if (!observation || !observations) {
        return null;
    }

    const makeMarker = (obs) => {
        const position = {lat: obs.latitude, lng: obs.longitude};
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
    }

    const position = {lat: observation.latitude, lng: observation.longitude}

    const taxonId = observation.taxon_id;
    const otherObservations = Object.values(observations).filter(obs => obs.taxon_id === taxonId && obs.id !== observation.id);
    const additionalMarkers = otherObservations.map(obs => makeMarker(obs));


    return (
        <MapContainer
            key={JSON.stringify(position)}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} >
            {additionalMarkers}
            <Popup>
               <ObservationCard observation={observation} />
            </Popup>
            </Marker>
        </MapContainer>
    )
}
