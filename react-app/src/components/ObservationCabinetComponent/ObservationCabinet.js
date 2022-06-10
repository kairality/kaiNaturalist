import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { titleCase } from "title-case";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

import "./ObservationCabinet.css";
import ObservationCard from "../ObservationCard/ObservationCard";
import ObservationMap from "../ObservationMapComponent/ObservationMap";
import ObservationHeader from "./ObservationHeader";
import CabinetPhoto from "./CabinetPhoto";
import ObservationTrashCanNotTrashCant from "./ObservationTrashCanNotTrashCant";

dayjs.extend(calendar);

export default function ObservationCabinet() {
  const taxa = useSelector((state) => state.taxonomy);
  const observations = useSelector((state) => state.observations);
  const { id } = useParams();
  const observation = observations?.[id];
  if (!observation) {
    return null;
  }

  return (
    <div className="observation-cabinet">
      <div className="cabinet-container">
        <div className="cabinet-taxon-header">
          <ObservationHeader observation={observation} />
          <button className="go-button">Lol</button>
        </div>
        <div className="cabinet-row">
          <div className="cabinet-row-left">
            <div className="cabinet-photo">
              <CabinetPhoto observation={observation} />
            </div>
            <div className="cabinet-details">Comment goes here</div>
          </div>
          <div className="cabinet-row-right">
            <div className="cabinet-user-info">
              Placeholder for user details!
              <ObservationTrashCanNotTrashCant observation={observation} />
            </div>
            <ObservationMap observation={observation} />
          </div>
        </div>
      </div>
    </div>
  );
}
