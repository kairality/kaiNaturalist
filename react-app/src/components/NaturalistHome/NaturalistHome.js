import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./NaturalistHome.css";

import ObservationCard from "../ObservationCard/ObservationCard";
import { genObservations } from "../../store/observation";

import Loader from "../Loader/Loader";

export default function NaturalistHome() {

  const observations = useSelector((state) => state.observations)
  const taxa = useSelector((state) => state.taxonomy)
  const [loaded, setLoaded] = useState(false);
  const [taxaLoaded, setTaxaLoaded] = useState(taxa?.[0])

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const _observations = await dispatch(genObservations());
      if (_observations) {
        setLoaded(true)
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(taxa).length) {
      setTaxaLoaded(true);
    }
  },[taxa])

  if (!loaded || !taxaLoaded) {
    return (
    <div className="home-loading" id="home-container">
      <Loader loadingText={"Initializing Taxonomy"}/>
    </div>
    );
  }

  return (
    <div id="home-container">
      <h1>Recent Observations</h1>
      <div class="observation-display">
        {Object.values(observations).map((observation) => {
          return <ObservationCard key={`observation-${observation.id}`} observation={observation} />;
        })}
      </div>
    </div>
  );
};
