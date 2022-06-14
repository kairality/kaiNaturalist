import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCowboy, faUsersRays, faPersonDigging, faPeopleCarryBox } from "@fortawesome/pro-solid-svg-icons";

import { ConsensusType } from "../../../utils/taxonomy_utils";

import "./ConsensusIcon.css"

export default function ConsensusIcon({ consensusType, }) {
  if (!consensusType || consensusType === ConsensusType.NO_CONSENSUS) {
    return null;
  }

  let icon;
  let classAddendum;

    switch (consensusType) {
      case ConsensusType.CONSENSUS:
        icon = <FontAwesomeIcon icon={faUsersRays} />
        classAddendum = " consensus";
        break;
      case ConsensusType.OVERLAPPING:
        icon = <FontAwesomeIcon icon={faPeopleCarryBox} />
         classAddendum = " overlap";
        break;
      case ConsensusType.REFINEMENT:
        icon = <FontAwesomeIcon icon={faPersonDigging} />
        classAddendum = " refinement"
        break;
      case ConsensusType.MAVERICK:
        icon = <FontAwesomeIcon icon={faUserCowboy} />
        classAddendum = " maverick";
        break;
      default:
        icon = <></>;
    }

  return <div className={`consensus-icon${classAddendum}`}>{icon}</div>;
}
