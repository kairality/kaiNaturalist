import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./NaturalistHome.css";

import ObservationCard from "../ObservationCard/ObservationCard";
import { genObservations } from "../../store/observation";

export default function NaturalistHome() {

  const observations = useSelector((state) => state.observations)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(genObservations());
  }, [dispatch]);

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
