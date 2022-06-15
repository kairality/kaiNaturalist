import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithubAlt} from "@fortawesome/free-brands-svg-icons";
export const gitHubUrl = "https://github.com/kairality";

export default function GitHubLink() {
    return (
    <div className="about-link github-repo-link">
      <a href={gitHubUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithubAlt} />
        {"kairality @ github"}
      </a>
    </div>
    );
}
