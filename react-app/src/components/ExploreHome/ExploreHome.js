import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import ExploreMap from "./ExploreMap";

import "./ExploreHome.css";
import ObservationCabinet from "../ObservationCabinetComponent/ObservationCabinet";
import ObservationCard from "../ObservationCard/ObservationCard";
import ObservationMiniCard from "./ObservationMiniCard";
import Loader from "../Loader/Loader";
import { YOSEMITE_COORDS } from "../ObservationUploadComponent/ObservationUpload";

export default function ExploreHome() {
  const taxa = useSelector((state) => state.taxonomy);
  const observations = useSelector((state) => state.observations);
  const observationIDs = Object.values(observations).map(
    (observation) => observation.id
  );
  const [popup, setPopup] = useState(null);
  // const [explorePosition, setExplorePosition] = useState({lat: 0, lng: 0});

  const explorePositionLocal = sessionStorage.getItem('explorePosition');
  const explorePosition = explorePositionLocal ? JSON.parse(explorePositionLocal) : YOSEMITE_COORDS;

  const [visible, setVisible] = useState({...observations });

  const merge = (obs, prevState) => {
    console.log(prevState, obs)
    if (prevState[obs.id]) {
      return prevState;
    } else {
      const doppelganger = { ...prevState };

      doppelganger[obs.id] = obs;
      return doppelganger;
    }
  };

  const unmerge = (obs, prevState) => {
     console.log("----------****");
    console.log(prevState);
    console.log(obs);
    if (!prevState[obs.id]) {
      return prevState;
    } else {
      const doppelganger = { ...prevState };
      delete doppelganger[obs.id];
      console.log(doppelganger);
      return doppelganger;
    }
  };

  const showObservation = (observation) =>
    setVisible((prev) => merge(observation, prev));
  const removeObservation = (observation) =>
    setVisible((prev) => unmerge(observation, prev));

  const clickHandler = (e, observation) => {
    e.preventDefault();
    setPopup((prev) => (prev === observation.id ? null : observation.id));
    // setExplorePosition({lat: observation.latitude, lng: observation.longitude})
  };

  const storePosition = (position) => sessionStorage.setItem(
          'explorePosition',
          JSON.stringify({'lat': position.lat, lng: position.lng}));

  return (
    <div className="explore-home">
      {!taxa[1] && <Loader></Loader>}
      <ExploreMap
        observations={observations}
        onPositionChanged={storePosition}
        showObservation={showObservation}
        removeObservation={removeObservation}
        popup={popup}
        setPopup={setPopup}
        explorePosition={explorePosition}
        visibleMarkers={visible}
      />
      <div className="divider"></div>
      <div className="preview" key={JSON.stringify(visible)}>
        <h1>Explore Your World</h1>
        {Object.values(visible).map((obs) => (
          <ObservationMiniCard
            key={obs.id}
            observation={obs}
            handleClick={(e) => clickHandler(e, obs)}
          />
        ))}
      </div>
    </div>
  );
}
