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
import ObservationStatus from "../ObservationCard/ObservationStatus";
import ObservationEdit from "./ObservationEdit";
import ObservationUserInfo from "./ObservationUserInfo";
import ObservationComment from "./ObservationComment";
import IdentificationForm from "./IdentificationForm/IdentificationForm";
import IdentificationCabinet from "./IdentificationCabinet/IdentificationCabinet";

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
          <div className="cabinet-header-titles">
            <ObservationHeader observation={observation} />
          </div>
          <div className="cabinet-header-controls">
            <ObservationEdit {...{observation}} />
            <ObservationTrashCanNotTrashCant {...{observation}} />
          </div>
        </div>
        <div className="cabinet-row">
          <div className="cabinet-row-left">
            <div className="cabinet-photo">
              <CabinetPhoto {...{observation}} />
            </div>
            <div className="cabinet-details">
              <ObservationComment {...{observation}} />
            </div>
          </div>
          <div className="cabinet-row-right">
            <div className="cabinet-user-info">
              <ObservationUserInfo {...{observation}} />
            </div>
            <ObservationMap observation={observation} />
          </div>
        </div>
        <div className={"identification-row"}>
          <IdentificationForm observation={observation} />
          <IdentificationCabinet {...{observation}} />
        </div>
      </div>
    </div>
  );
}
