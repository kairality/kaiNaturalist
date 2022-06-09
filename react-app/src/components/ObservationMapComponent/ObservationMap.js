import React from "react";
import {MapContainer, TileLayer, Marker, Popup } from "@monsonjeremy/react-leaflet";

export default function ObservationMap({observation}) {
    if (!observation) {
        return null;
    }
    const position = {lat: observation.latitude, lng: observation.longitude}

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    )
}
