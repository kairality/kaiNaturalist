import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "@monsonjeremy/react-leaflet";
import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";
import MapInput from "../MapInputComponent/MapInput";

export default function ObservationUpload() {
    const test = {
        lat: 37,
        lng: -122,
    };
  const [position, setPosition] = useState(test);

  console.log(position);


  return (
      <form>
          {position && <MapInput position={position} onPositionChanged={(latlng) => setPosition(latlng)} />}
      </form>
  );
}
