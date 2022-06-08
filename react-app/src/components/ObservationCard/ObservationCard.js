import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import "./ObservationCard.css";

export default function ObservationCard({observation}) {
  if (!observation) {
      return null;
  }
  return (
    <div className="observation-card" id={`observation-card-${observation.id}`}>
      <div className="observation-card-img">
        <NavLink to={`/observations/${observation.id}`}>
          {observation.img_url ? (
            <img src={observation.img_url} alt={observation.description} />
          ) : (
            <p className={"no-img"}>No Image, Somehow</p>
          )}
        </NavLink>
      </div>
      <div className="observation-card-text">
        <div className="observation-top-bar">
          <div className="observation-taxon">Placeholder</div>
        </div>
        <div className="observation-details">Placeholder</div>
        <div className="observation-details-2">
          Placeholder
        </div>
      </div>
    </div>
  );
};
