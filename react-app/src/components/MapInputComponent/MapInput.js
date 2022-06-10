import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, useMap } from "@monsonjeremy/react-leaflet";
import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { marker } from "leaflet";

function LeafletSearch({onPositionChanged}) {
  const handlePositionChange = (e) => {
    console.log(e);
    console.log(e.target);
    const garbledLocation = e.location;
    const newPosition = {lat: garbledLocation.y, lng: garbledLocation.x}
    onPositionChanged(newPosition)
  }
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
    });
    map.addControl(searchControl);
    map.on("geosearch/showlocation", handlePositionChange);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

export default function MapInput({position, onPositionChanged}) {
    const marker =
        <DraggableMarker
          position={position}
          onPositionChanged={onPositionChanged}
        />;
    return (
      <>
        <span>
            Location Selected: {`${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`}
        </span>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marker}
          <LeafletSearch onPositionChanged={onPositionChanged}/>
        </MapContainer>
      </>
    );
}
