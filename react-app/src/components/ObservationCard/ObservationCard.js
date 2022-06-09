import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { titleCase } from "title-case";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

import "./ObservationCard.css";

dayjs.extend(calendar)

export default function ObservationCard({observation}) {
  const taxa = useSelector((state) => state.taxonomy);

  if (!observation) {
      return null;
  }

  const calendarCustom = {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
  }



  const taxon = taxa?.[observation.taxon_id];
  if(!taxon) {
    return null;
  }
   console.log(observation)
   const timeCaption = dayjs(observation.date).calendar(dayjs(), calendarCustom)
   console.log(timeCaption)

  const taxonName = taxon.common_name ?
    titleCase(taxon.common_name) : titleCase(taxon.scientific_name);

  const taxonTaxon = titleCase(`${taxon.rank.toLowerCase()} ${taxon.scientific_name}`);

  return (
    <div className="observation-card" id={`observation-card-${observation.id}`}>
      <NavLink
        className={"observation-card-img"}
        to={`/observations/${observation.id}`}
        style={{backgroundImage: `url("${observation.img_url}")`, backgroundSize: "cover"}}
       />
      <div className="observation-card-caption caption-pad">
          <div className="observation-title protect-overflow">{taxonName}</div>
          <div className="observation-taxon protect-overflow">({taxonTaxon})</div>
          <div className="observation-date">{timeCaption}</div>
      </div>
    </div>
  );
};
