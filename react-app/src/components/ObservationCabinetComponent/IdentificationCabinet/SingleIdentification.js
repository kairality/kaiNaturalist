import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TaxaRow from "../../TaxaRow/TaxaRow";
import UserAvatar from "../../UserAvatarComponent/UserAvatar";

import "./IdentificationCabinet.css";
import IdentificationEdit from "./IdentificationEdit";
import IdentificationTrashCanNotTrashCant from "./IdentificationTrashCanNotTrashCant";
import ConsensusIcon from "./ConsensusIcon";
import { ConsensusType, getConsensusType } from "../../../utils/taxonomy_utils";

export default function SingleIdentification({ identification, showControls }) {
  const taxa = useSelector((state) => state.taxonomy);
  const observations = useSelector((state) => state.observations);
  if (!identification || !Object.keys(taxa).length) {
    return null;
  }
  let showControlsOverride = false;

  const observation = observations[identification.observation_id];
  const linked_identification_id = observation.linked_identification_id;
  if (linked_identification_id === identification.id) {
    showControlsOverride = true;
  }

  const consensusType = getConsensusType(taxa, observation, identification);
  console.log(consensusType);
  let consensusClassAddendum;
  switch (consensusType) {
    case ConsensusType.CONSENSUS:
      consensusClassAddendum = " consensus";
      break;
    case ConsensusType.OVERLAPPING:
      consensusClassAddendum = " overlapping";
      break;
    case ConsensusType.REFINEMENT:
      consensusClassAddendum = " refinement";
      break;
    case ConsensusType.MAVERICK:
      consensusClassAddendum = " maverick";
      break;
    default:
      consensusClassAddendum = "";
  }

  const taxon = taxa[identification.taxon_id];
  return (
    <div className={`single-identification${consensusClassAddendum}`}>
      <div className="avatar-wrapper">
        <UserAvatar user={identification.user} avatarOnly />
        <span className="comment-username">{identification.user.username}</span>
      </div>
      <div className="identification-info-box-wrapper">
        <div className="identification-comment-box">
          {identification.user.username} thinks this is
          <TaxaRow {...{ taxon }} />
          {identification.comment}
          <ConsensusIcon consensusType={consensusType} />
          {showControls && !showControlsOverride && (
            <div className="single-identification-controls">
              <IdentificationEdit {...{ identification }} />
              <IdentificationTrashCanNotTrashCant {...{ identification }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
