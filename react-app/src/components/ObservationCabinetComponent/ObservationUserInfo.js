import React from "react";
import { useSelector } from "react-redux";
import UserAvatar from "../UserAvatarComponent/UserAvatar";
import dayjs from "dayjs";

import "./ObservationUserInfo.css";


export default function ObservationUserInfo({ observation }) {
  if (!observation) {
    return null;
  }
  const seen_date = dayjs(observation.date).format('YYYY/MM/DD');
  const submitted_date = dayjs.unix(observation.created_at).format('YYYY/MM/DD')
  return (
    <div className="observation-info">
      <UserAvatar user={observation.user} withUserName />
      <div className="observation-date">
        <span>Observed:</span>
        <span>{seen_date}</span>
      </div>
      <div className="observation-date">
        <span>Uploaded:</span>
        <span>{submitted_date}</span>
      </div>
    </div>
  );
}
