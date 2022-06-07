import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer } from "@monsonjeremy/react-leaflet";
import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";

export default function MapInput({position, onPositionChanged}) {
    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker position={position} onPositionChanged={onPositionChanged}/>
        </MapContainer>
    );
}
