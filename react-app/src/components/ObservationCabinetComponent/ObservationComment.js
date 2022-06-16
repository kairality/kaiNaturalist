import React from "react";
import UserAvatar from "../UserAvatarComponent/UserAvatar";
import ClampLines from "react-clamp-lines"

import "./ObservationComment.css";


export default function ObservationComment({observation}) {
    if (!observation) {
        return null;
    }
    return (
      <div className="observation-description">
        <div className="avatar-wrapper">
          <UserAvatar user={observation.user} avatarOnly />
          <span className="comment-username">{observation.user.username}</span>
        </div>
        <div className="observation-description-box-wrapper">
          <ClampLines
            text={observation.description}
            lines={3}
            className="observation-description-box"
          />
        </div>
      </div>
    );
}
