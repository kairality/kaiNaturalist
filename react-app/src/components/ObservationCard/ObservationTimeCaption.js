import React from "react"
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import "./ObservationCard.css";
dayjs.extend(calendar);

  export const calendarCustom = {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: "MM/DD/YYYY", // Last week ( Last Monday at 2:30 AM )
    sameElse: "MM/DD/YYYY", // Everything else ( 7/10/2011 )
  };

export default function ObservationTimeCaption({observation}) {
        const timeCaption = dayjs(observation.date).calendar(
        dayjs(),
        calendarCustom
        );
    if (!observation) {
        return null;
    }

    return (
        <div className="observation-date">{timeCaption}</div>
    );
}
