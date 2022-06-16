import React, { useState } from "react";
import ExploreMap from "./ExploreMap";

import "./ExploreHome.css"

export default function ExploreHome() {
    const [observations, setObservations] = useState([]);
    return (
      <div className="explore-home">
        <ExploreMap onPositionChanged={(position) => console.log(position)} />
      </div>
    );
}
