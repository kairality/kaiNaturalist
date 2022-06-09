import React, {useState} from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import "./Loader.css";

export default function Loader() {
    const items = [
      faLeaf,
      faFrog,
      faCrow,
      faOtter,
      faKiwiBird,
      faLocust,
      faWorm,
    ];
    const [icon] = useState(randomItem(items));
    return (
        <div class="loader">
            <div class="loader-glyph">
                <FontAwesomeIcon icon={icon} id={"leaf"}/>
            </div>
            <div class="loader-caption"></div>
        </div>
    );
}
