import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { titleCase } from "title-case";

import "./ObservationCard.css";

export default function ObservationCard({observation}) {
  if (!observation) {
      return null;
  }

  const taxonName = observation.taxon.common_name ?
    titleCase(observation.taxon.common_name) : titleCase(observation.taxon.scientific_name);

  const taxonTaxon = titleCase(`${observation.taxon.rank.toLowerCase()} ${observation.taxon.scientific_name}`);

  return (
    <div className="observation-card" id={`observation-card-${observation.id}`}>
      <NavLink
        className={"observation-card-img"}
        to={`/observations/${observation.id}`}
        style={{backgroundImage: `url("${observation.img_url}")`, backgroundSize: "cover"}}
       />
      <div className="observation-card-caption">
          <div className="observation-title">{taxonName}</div>
          <div className="observation-taxon">({taxonTaxon})</div>
      </div>
    </div>
  );
};
