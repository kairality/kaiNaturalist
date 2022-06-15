import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const linkedInUrl = "https://www.linkedin.com/in/kai-seward-01338b95/"

export default function LinkedinLink() {
    return(
  <div className="about-link linkedin-link">
    <a href={linkedInUrl} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={faLinkedin} />
      {"Kai Seward @ LinkedIn"}
    </a>
  </div>
    );
}
