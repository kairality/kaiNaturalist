import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react'
import { Marker, Popup, useMapEvents } from '@monsonjeremy/react-leaflet';

export default function DraggableMarker({position, onPositionChanged, editMode}) {
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
    locationerror: (e) => {
    },
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
    if (!editMode) {
      map.locate();
    }
  }, [map, editMode])

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position])

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
