import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import TaxaRow from "../../TaxaRow/TaxaRow"
import UserAvatar from "../../UserAvatarComponent/UserAvatar"

import "./IdentificationCabinet.css"
import IdentificationTrashCanNotTrashCant from "./IdentificationTrashCanNotTrashCant"

export default function SingleIdentification({identification, showControls}) {
    const taxa = useSelector((state) => state.taxonomy)
    const observations = useSelector((state) => state.observations)
    if (!identification) {
        return null;
    }
    let showControlsOverride = false;

    const observation = observations[identification.observation_id];
    const linked_identification_id = observation.linked_identification_id;
    if (linked_identification_id === identification.id) {
        console.log(linked_identification_id, identification.id)
        showControlsOverride = true;
    }
    console.log(showControls);
    console.log(showControlsOverride);

    const taxon = taxa[identification.taxon_id]
    return (
          <div className="single-identification">
            <div className="avatar-wrapper">
              <UserAvatar user={identification.user} avatarOnly />
              <span className="comment-username">
                {identification.user.username}
              </span>
            </div>
            <div className="identification-info-box-wrapper">
              <div className="identification-comment-box">
                {identification.user.username} thinks this is
                <TaxaRow {...{taxon}} />
                {identification.comment}
              </div>
            </div>
            {showControls && (!showControlsOverride) && <div className="single-identification-controls">
                <IdentificationTrashCanNotTrashCant {...{identification}} />
            </div>}
          </div>
    )

}
