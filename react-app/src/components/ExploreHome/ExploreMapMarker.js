import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Marker, Popup, useMapEvents } from "@monsonjeremy/react-leaflet";
import ObservationCard from "../ObservationCard/ObservationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faMushroom,
  faPaw,
  faLocust,
  faFishFins,
  faTurtle,
} from "@fortawesome/pro-solid-svg-icons";
import { getRank, taxonomyWalkUp } from "../../utils/taxonomy_utils";
import { faHandLizard } from "@fortawesome/pro-regular-svg-icons";

const KINGDOM_ICONS = {
  Animalia: faPaw,
  Fungi: faMushroom,
  Plantae: faLeaf,
};

const CLASS_ICONS = {
  Aves: faPaw,
  Reptilia: faTurtle,
  Pisces: faFishFins,
  Insecta: faLocust,
};

export default function ExploreMapMarker({
  isActive,
  observation,
  showObservation,
  removeObservation,
  popup,
  setPopup,
}) {
  const position = { lat: observation.latitude, lng: observation.longitude };

  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();

  const map = useMapEvents({
    move: (e) => {
      const bounds = map.getBounds();
      if (bounds.contains(position)) {
        showObservation(observation);
      } else {
        removeObservation(observation);
      }
    },
    moveend: (e) => {
      const bounds = map.getBounds();
      if (bounds.contains(position)) {
        showObservation(observation);
      } else {
        removeObservation(observation);
      }
    },
    viewreset: (e) => {
      const bounds = map.getBounds();
      if (bounds.contains(position)) {
        showObservation(observation);
      } else {
        removeObservation(observation);
      }
    },
  });

  useEffect(() => {
    if (refReady && isActive) {
      popupRef.openOn(map);
    }
  }, [isActive, refReady, map]);

  return (
    <Marker position={position}>
      {" "}
      <Popup
        onClose={() => setPopup(null)}
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
      >
        <ObservationCard observation={observation} />
      </Popup>
    </Marker>
  );
}
