import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import TaxaRow from "../../TaxaRow/TaxaRow"
import UserAvatar from "../../UserAvatarComponent/UserAvatar"

import "./IdentificationCabinet.css"

export default function SingleIdentification({identification}) {
    const taxa = useSelector((state) => state.taxonomy)
    if (!identification) {
        return null;
    }
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
          </div>
    )

}
