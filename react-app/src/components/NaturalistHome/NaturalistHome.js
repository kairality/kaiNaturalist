import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./NaturalistHome.css";

import ObservationCard from "../ObservationCard/ObservationCard";
import { genObservations } from "../../store/observation";

import Loader from "../Loader/Loader";

export default function NaturalistHome() {

  const observations = useSelector((state) => state.observations)
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const _observations = await dispatch(genObservations());
      if (_observations) {
        setLoaded(true)
      }
    })();
  }, [dispatch]);

  if (!loaded) {
    return (
    <div className="home-loading" id="home-container">
      <Loader />
    </div>
    );
  }

  return (
    <div id="home-container">
      <div class="observation-display">
        {Object.values(observations).map((observation) => {
          return <ObservationCard key={`observation-${observation.id}`} observation={observation} />;
        })}
      </div>
    </div>
  );
};
