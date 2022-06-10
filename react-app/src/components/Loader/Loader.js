import React, {useRef} from "react";
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
      faBugs,
    ];

export function RandomNaturalistIcon({additionalIcons}) {
      const icons = additionalIcons ? [...naturalistIcons, ...additionalIcons] : naturalistIcons;
      const icon = useRef(randomItem(icons));
      return <FontAwesomeIcon icon={icon.current} id={"leaf"} />;
}

export default function Loader() {


    return (
        <div class="loader">
            <div class="loader-glyph">
                <RandomNaturalistIcon />
            </div>
            <div class="loader-caption"></div>
        </div>
    );
}
