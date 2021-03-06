import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { Marker, Popup, useMapEvents } from "@monsonjeremy/react-leaflet";
import ObservationCard from "../ObservationCard/ObservationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { divIcon } from "leaflet";

import {
  faLeaf,
  faMushroom,
  faPaw,
  faLocust,
  faFishFins,
  faTurtle,
  faCrab,
  faSpider,
  faBee,
  faMosquito,
  faFrog,
  faSquid,
  faCrow,
  faFlowerTulip,
  faTreePalm,
  faTree,
  faTreeDeciduous,
  faShrimp,
  faBug,
  faElephant,
  faRabbit,
  faBat,
  faDuck,
  faPawClaws,
  faCactus,
} from "@fortawesome/pro-solid-svg-icons";
import { getRank, taxonomyWalkUp } from "../../utils/taxonomy_utils";

import { faOctopus, faOctopusDeploy } from "@fortawesome/free-brands-svg-icons";

const KINGDOM_ICONS = {
  Animalia: faPaw,
  Fungi: faMushroom,
  Plantae: faLeaf,
};

const PHYLUM_ICONS = {
  Arthropoda: faSpider,
  Mollusca: faSquid,
};

const CLASS_ICONS = {
  Aves: faCrow,
  Reptilia: faTurtle,
  Actinopterygii: faFishFins,
  Chondrichthyes: faFishFins,
  Sarcopterygii: faFishFins,
  Insecta: faLocust,
  Malacostraca: faCrab,
  Branchiopoda: faShrimp,
  Amphibia: faFrog,
};

const ORDER_ICONS = {
  Hymenoptera: faBee,
  Diptera: faMosquito,
  Coleoptera: faBug,
  Pinales: faTree,
  Arecales: faTreePalm,
  Liliales: faFlowerTulip,
  Fagales: faTreeDeciduous,
  Proboscidea: faElephant,
  Lagomorpha: faRabbit,
  Chiroptera: faBat,
  Anseriformes: faDuck,
  Carnivora: faPawClaws,
  Caryophyllales: faCactus,
};

export default function ExploreMapMarker({
  isActive,
  observation,
  showObservation,
  removeObservation,
  popup,
  setPopup,
  visibleMarkers,
}) {
  const taxa = useSelector((state) => state.taxonomy);
  const taxaLoaded = taxa[1] !== undefined;
  const position = { lat: observation.latitude, lng: observation.longitude };

  const [refReady, setRefReady] = useState(false);
  const [initialZoomDone, setInitialZoomDone] = useState(
    sessionStorage.getItem("explorePosition")
  );
  const [mapStable, setMapStable] = useState(false);
  let popupRef = useRef();
  const markerRef = useRef();

  const maybeGetUpdateMethod = (map) => {
    const bounds = map.getBounds();
    const inBounds = bounds.contains(position);
    console.log(visibleMarkers);
    const currentlyVisible = visibleMarkers[observation.id];
    if (inBounds) {
      return currentlyVisible ? null : showObservation;
    } else {
      return currentlyVisible ? removeObservation : null;
    }
  }

  const handleUpdate = (map) => {
    const updater = maybeGetUpdateMethod(map);
    if (updater) {
      setTimeout(() => updater(observation), 1000);
    } else {
      return;
    }
  }

  const map = useMapEvents({
    moveend: (e) => {
      if (!initialZoomDone) {
        setInitialZoomDone(true);
      }
      console.log("updating")
      handleUpdate(map);
    },
    click: (e) => handleUpdate(map)
  });

  map.on("geosearch/showlocation", (e) => {
    handleUpdate(map);
  });

  useEffect(() => {
    if (refReady && isActive) {
      popupRef.openOn(map);
    }
  }, [isActive, refReady, map]);

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (markerRef) markerRef.current.openPopup();
      },
      // mouseout() {
      //   if (markerRef) markerRef.current.closePopup();
      // },
    }),
    []
  );

  useEffect(() => {
    if (taxaLoaded && initialZoomDone && !mapStable) {
      map.flyTo(map.getCenter());
      setMapStable(true);
    }
  }, [taxaLoaded, initialZoomDone, map, mapStable]);

  if (!taxa[1]) {
    return (
      <Marker
        ref={markerRef}
        position={position}
        className="not-map-marker"
        eventHandlers={eventHandlers}
      />
    );
  }

  const getIcon = (observation) => {
    const taxon = taxa[observation.taxon_id];
    let ancestry = taxonomyWalkUp(taxa, taxon);
    ancestry = [observation.taxon_id, ...ancestry];
    for (let item of ancestry) {
      const ancestor = taxa[item];
      const scientific_name = ancestor.scientific_name;
      if (ORDER_ICONS[scientific_name]) {
        return ORDER_ICONS[scientific_name];
      }
      if (CLASS_ICONS[scientific_name]) {
        return CLASS_ICONS[scientific_name];
      }
      if (PHYLUM_ICONS[scientific_name]) {
        return PHYLUM_ICONS[scientific_name];
      }
      if (KINGDOM_ICONS[scientific_name]) {
        return KINGDOM_ICONS[scientific_name];
      }
    }
    return null;
  };

  const iconType = getIcon(observation);
  const jsxIcon = <FontAwesomeIcon icon={iconType} />;
  const icon = divIcon({
    className: `map-marker ${iconType.iconName}`,
    html: renderToString(jsxIcon),
    iconSize: [24, 24],
    popupAnchor: [-8, -36],
  });

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      eventHandlers={eventHandlers}
    >
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
