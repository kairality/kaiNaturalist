import React, { useEffect } from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap } from "@monsonjeremy/react-leaflet";
import ObservationCard from "../ObservationCard/ObservationCard";
import { useSelector } from "react-redux";

export default function ObservationMap({observation}) {
    const observations = useSelector(state => state.session.observations);
    if (!observation) {
        return null;
    }
    const position = {lat: observation.latitude, lng: observation.longitude}

    const taxon_id = observation.taxon_id;


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
            <Popup>
               <ObservationCard observation={observation} />
            </Popup>
            </Marker>
        </MapContainer>
    )
}
