import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./NaturalistHome.css";

import ObservationCard from "../ObservationCard/ObservationCard";
import { genObservations } from "../../store/observation";

import Loader from "../Loader/Loader";

export default function NaturalistHome() {
  const user = useSelector((state) => state.session.user);
  const observations = useSelector((state) => state.observations);
  const taxa = useSelector((state) => state.taxonomy);
  const [loaded, setLoaded] = useState(false);
  const [taxaLoaded, setTaxaLoaded] = useState(taxa?.[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const _observations = await dispatch(genObservations());
      if (_observations) {
        setLoaded(true);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(taxa).length) {
      setTaxaLoaded(true);
    }
  }, [taxa]);

  if (!loaded || !taxaLoaded || !user) {
    return (
      <div className="home-loading" id="home-container">
        <Loader loadingText={"Initializing Taxonomy"} />
      </div>
    );
  }


  // partition observations into "My observations", "observations that need ID", and "everything else"
  const [myObservations, othersObservations, needsIDObservations] =
    Object.values(observations).reduce(
      ([mine, others, needsID], observation) => {
        if (observation.user_id === user.id) {
          return [[...mine, observation], others, needsID];
        } else if (!observation.verified) {
          return [mine, others, [...needsID, observation]];
        } else {
          return [mine, [...others, observation], needsID];
        }
      },
      [[], [], []]
    );

  return (
    <div id="home-container">
      {myObservations.length > 0 && (
        <>
          <h1>My Observations</h1>
          <div class="observation-display">
            {myObservations.map((observation) => {
              return (
                <ObservationCard
                  key={`observation-${observation.id}`}
                  observation={observation}
                />
              );
            })}
          </div>
        </>
      )}
      {needsIDObservations.length > 0 && (
        <>
          <h1>Observations Needing Verification</h1>
          <div class="observation-display">
            {needsIDObservations.map((observation) => {
              return (
                <ObservationCard
                  key={`observation-${observation.id}`}
                  observation={observation}
                />
              );
            })}
          </div>
        </>
      )}
      {othersObservations.length > 0 && (
        <>
          <h1>Recent Community IDs</h1>
          <div class="observation-display">
            {othersObservations.map((observation) => {
              return (
                <ObservationCard
                  key={`observation-${observation.id}`}
                  observation={observation}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
