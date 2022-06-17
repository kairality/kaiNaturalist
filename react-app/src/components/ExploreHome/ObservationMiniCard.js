import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { titleCase } from "title-case";
import ObservationStatus from "../ObservationCard/ObservationStatus";

import ObservationTimeCaption from "../ObservationCard/ObservationTimeCaption";

import "./ObservationMiniCard.css";

export default function ObservationMiniCard({ observation, handleClick }) {
  const taxa = useSelector((state) => state.taxonomy);

  if (!observation) {
    return null;
  }

  const taxon = taxa?.[observation.taxon_id];
  if (!taxon) {
    return null;
  }

  const taxonName = taxon.common_name
    ? titleCase(taxon.common_name)
    : titleCase(taxon.scientific_name);

  const taxonTaxon = titleCase(
    `${taxon.rank.toLowerCase()} ${taxon.scientific_name}`
  );

  return (
    <div
      className="observation-card-mini"
      id={`observation-card-mini-${observation.id}`}
      onClick={handleClick}
    >
      <div
        className={"observation-mini-card-img"}
        to={`/observations/${observation.id}`}
        style={{
          backgroundImage: `url("${observation.img_url}")`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="observation-mini-title protect-overflow">{taxonName}</div>
      <div className="observation-mini-subtitle protect-overflow">
        {taxonTaxon}
      </div>
      <ObservationStatus observation={observation} />
    </div>
  );
}
