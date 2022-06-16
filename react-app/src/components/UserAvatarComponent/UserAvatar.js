import React from "react";

import frog from "../../images/frog-avatar.png"
import bug from "../../images/bug-avatar.png";
import lizard from "../../images/lizard-avatar.png";
import trout from "../../images/trout-avatar.png";
import slug from "../../images/slug-avatar.png";

import { faBinoculars } from "@fortawesome/pro-solid-svg-icons";

import "./UserAvatar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export const avatars = [frog, bug, lizard, trout, slug]

export default function UserAvatar({user, avatarOnly}) {
    const observations = useSelector((state) => state.observations);
    const obsCount = Object.values(observations).filter(obs => obs.user_id === user?.id).length;
    if (!user) {
        return null;
    }
    const avatar = avatars[user.id % avatars.length]
    const profileImage = <img className="user-avatar" src={avatar} />
    if (avatarOnly) {
        return profileImage;
    }
    return (
      <div className="user-info" key={JSON.stringify(observations)}>
        {profileImage}
        <div className="user-info-details">
          <span className="user-info-username">{user.username}</span>
          <span className="user-info-observations">
            <FontAwesomeIcon icon={faBinoculars} /> {obsCount} Observation{obsCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    );
}
