import React from "react";
import { useSelector } from "react-redux";
import { titleCase } from "title-case";
import ObservationStatus from "../ObservationCard/ObservationStatus";

import "./ObservationCabinet.css";
import "../ObservationCard/ObservationCard.css";

export function CommonNameHeader({ taxon }) {
  if (!taxon) {
    return null;
  }
  const scientific = titleCase(taxon.scientific_name);
  const common = taxon.common_name ? titleCase(taxon.common_name) : scientific;
  return taxon.common_name ? (
    <span className="display-name-header">{common}</span>
  ) : (
    <span className="sci-name-header">{scientific}</span>
  );
}

function ScientificNameHeader({ taxon }) {
  if (!taxon) {
    return null;
  }
  const scientific = titleCase(taxon.scientific_name);
  const rank = titleCase(taxon.rank.toLowerCase());
  return (
    <span className="sci-name-subheader">
      ({rank} {scientific})
    </span>
  );
}

export default function ObservationHeader({ observation }) {
  const taxa = useSelector((state) => state.taxonomy);
  const sad_taxon = {
    scientific_name: "Unidentified",
    common_name: "Unidentified",
  };

  const taxon = observation.taxon_id ? taxa?.[observation.taxon_id] : sad_taxon;
  return (
    <div className={"observation-header"}>
      <CommonNameHeader {...{ taxon }} />
      <ScientificNameHeader {...{ taxon }} />
      <ObservationStatus {...{ observation }} />
    </div>
  );
}
