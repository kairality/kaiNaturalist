import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "@monsonjeremy/react-leaflet";
import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";
import MapInput from "../MapInputComponent/MapInput";
import TaxaTypeahead from "../TaxaTypeaheadComponent/TaxaTypeahead";

export default function ObservationUpload() {
    const test = {
        lat: 37,
        lng: -122,
    };
  const [position, setPosition] = useState(test);
  const [selectedTaxa, setSelectedTaxa] = useState(null);

  console.log(position);


  return (
      <form>
          {position && <MapInput position={position} onPositionChanged={(latlng) => setPosition(latlng)} />}
          <TaxaTypeahead />
      </form>
  );
}
