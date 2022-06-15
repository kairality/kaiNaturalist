import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithubAlt} from "@fortawesome/free-brands-svg-icons";
import {faCodeBranch} from "@fortawesome/free-solid-svg-icons";
export const gitHubRepoUrl = "https://github.com/kairality";

export default function GitHubRepoLink() {
    return (
    <div className="about-link github-repo-link">
        <a href={gitHubRepoUrl} target="_blank" rel="noreferrer">
           <FontAwesomeIcon icon={faCodeBranch} />
           {"kaiNaturalist @ github"}
        </a>
    </div>
    );
}
