import React, { useMemo, useRef, useState, useCallback } from 'react'
import { Marker, Popup, useMapEvents } from '@monsonjeremy/react-leaflet';

export default function DraggableMarker({position, onPositionChanged}) {
  const markerRef = useRef(null);


  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onPositionChanged(marker.getLatLng())
        }
      },
    }),
    [onPositionChanged]
  );

  const map = useMapEvents({
    dblclick: (e) => {
      const newPosition = e.latlng;
      onPositionChanged(newPosition)
    },
  });

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span >
            Drag to set your observation's location!
        </span>
      </Popup>
    </Marker>
  );
}
