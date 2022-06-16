import React from "react";
import ExploreMap from "./ExploreMap";

export default function ExploreHome() {
    return <ExploreMap onPositionChanged={(position) => console.log(position)} />
}
