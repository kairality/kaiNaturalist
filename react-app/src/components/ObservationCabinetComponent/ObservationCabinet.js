import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { titleCase } from "title-case";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

import "./ObservationCabinet.css";
import ObservationCard from "../ObservationCard/ObservationCard";

dayjs.extend(calendar);

export default function ObservationCabinet() {
  const taxa = useSelector((state) => state.taxonomy);
  const observations = useSelector((state) => state.observations);
  const {id} = useParams();
  const observation = observations?.[id];

  console.log('yes')
  console.log(id)
  console.log(observations)

  return (
    <div className="observation-cabinet">
        <ObservationCard observation={observation} />
    </div>
  );
}
