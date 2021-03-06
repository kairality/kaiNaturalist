import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import randomItem from "random-item";
// could do more icons but these are FREE!
import {
  faLeaf,
  faFrog,
  faCrow,
  faOtter,
  faKiwiBird,
  faLocust,
  faWorm,
  faFishFins,
  faHippo,
  faShrimp,
  faDove,
  faBugs,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCrab,
  faBee,
  faDolphin,
  faSquid,
  faTurtle,
  faSquirrel,
  faRabbitRunning,
  faElephant,
  faDeer,
  faFlower,
  faLeafOak,
  faAcorn,
} from "@fortawesome/pro-solid-svg-icons";
import "./Loader.css";

export const naturalistIcons = [
  faLeaf,
  faFrog,
  faCrow,
  faOtter,
  faKiwiBird,
  faLocust,
  faWorm,
  faFishFins,
  faHippo,
  faShrimp,
  faDove,
  faCrab,
  faDolphin,
  faSquid,
  faTurtle,
  faSquirrel,
  faRabbitRunning,
  faElephant,
  faDeer,
  faLeafOak,
  faAcorn,
  faFlower,
];

export function RandomNaturalistIcon({ additionalIcons }) {
  const icons = additionalIcons
    ? [...naturalistIcons, ...additionalIcons]
    : naturalistIcons;
  const icon = useRef(randomItem(icons));
  return <FontAwesomeIcon icon={icon.current} id={"leaf"} />;
}

export default function Loader({ loadingText }) {
  return (
    <div className="loader">
      <div className="loader-glyph">
        <RandomNaturalistIcon />
      </div>
      <div className="loader-caption">{loadingText ?? "Loading"}</div>
    </div>
  );
}
