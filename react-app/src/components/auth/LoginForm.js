import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import ErrorCard from "../ErrorCard/ErrorCard";
import DemoLogin from "./DemoLogin";

import {
  // faNarwhal,
  // faUserBountyHunter,
  // faCommentsQuestionCheck,
  faAt,
  faLockKeyhole,
} from "@fortawesome/pro-solid-svg-icons";

import {
  faNarwhal,
  faUserBountyHunter,
  faCommentsQuestionCheck,
  faPhotoFilm,
  faNotebook
} from "@fortawesome/pro-duotone-svg-icons";

import {
  faCircleArrowRight
} from "@fortawesome/pro-regular-svg-icons";

import toucan from "../../images/toucan.jpg";
import birdwing from "../../images/birdwing.jpg";

import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RandomNaturalistIcon } from "../Loader/Loader";
import GitHubLink from "../AboutLinks/GitHubLink";
import GitHubRepoLink from "../AboutLinks/GitHubRepoLink";
import LinkedinLink from "../AboutLinks/LinkedInLink";

export default function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="splash-wrapper">
      <div className="splash" style={{ backgroundImage: `url(${toucan})` }}>
        <form className="auth-form" onSubmit={onLogin}>
          <div className="login-text">
            <h3 id="h3-login">Connect with nature</h3>
            <h4 id="h4-login">But first, you must connect to your account.</h4>
          </div>
          {errors.length > 0 && (
            <div className="form-errors">
              <ErrorCard {...{ errors }} />
            </div>
          )}
          <div className="auth-fields">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
              <FontAwesomeIcon id="email-icon" icon={faAt} />
            </div>
          </div>
          <div className="auth-fields">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <FontAwesomeIcon id="pw-icon" icon={faLockKeyhole} />
            </div>
            <div className="login-buttons">
              <button id="form-login-btn" className="go-button" type="submit">
                Login
                <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
              <DemoLogin {...{ setErrors }} />
            </div>
            <p>Don't have an account?</p>
            <button id="to-sign-up" type="button" className="go-button" onClick={() => history.push('/sign-up')}>
              Sign up!
            </button>
          </div>
        </form>
      </div>
      <div className="splash-border">
        <div className="random-login-logo">
          <RandomNaturalistIcon />
        </div>
        <div className="splash-about-links-wrapper">
          <h4>
            kaiNaturalist is a full-stack application developed by Kai Seward in
            2022 inspired by{" "}
            <a href="https://www.inaturalist.org" target="_blank">
              iNaturalist.org
            </a>
            .
          </h4>
          <ul className="splash-about-links">
            <li>
              <GitHubLink />
            </li>
            <li>
              <GitHubRepoLink />
            </li>
            <li>
              <LinkedinLink />
            </li>
          </ul>
        </div>
      </div>
      <div className="how-it-works">
        <h2>How it Works</h2>
        <div className="how-it-works-inner">
          <div className="how-it-works-panel">
            <div className="hiw-icon">
              <FontAwesomeIcon className="hiw-icon-icon" icon={faNarwhal} />
            </div>
            <h3>Record Your Observations</h3>
          </div>
          <div className="how-it-works-panel">
            <div className="hiw-icon">
              <FontAwesomeIcon
                className="hiw-icon-icon"
                icon={faUserBountyHunter}
              />
            </div>
            <h3>Share With Fellow Naturalists</h3>
          </div>
          <div className="how-it-works-panel">
            <div className="hiw-icon">
              <FontAwesomeIcon
                className="hiw-icon-icon"
                icon={faCommentsQuestionCheck}
              />
            </div>
            <h3>Discuss Your Findings</h3>
          </div>
        </div>
      </div>
      <div className="contribute">
        <div className="contribute-info">
          <h2>Contribute to Science</h2>
          <p>
            Every observation can contribute to biodiversity science, from the
            rarest butterfly to the most common backyard weed.
          </p>
        </div>
        <img className="contribute-photo" src={birdwing} />
      </div>
      <div className="details">
        <h2>Nature At Your Fingertips</h2>
        <div className="details-wrapper">
          <div className="panel details-panel-a">
            <FontAwesomeIcon icon={faNotebook} />
            <div className="panel-wrapper">
              <h3>Keep Track</h3>
              <p>
                Record your encounters with other organisms all in the{" "}
                <strike>someone else's computer</strike> cloud!
              </p>
            </div>
          </div>
          <div className="panel details-panel-b">
            <FontAwesomeIcon icon={faNotebook} />
            <div className="panel-wrapper">
              <h3>Keep Track</h3>
              <p>
                Record your encounters with other organisms all in the{" "}
                <strike>someone else's computer</strike> cloud!
              </p>
            </div>
          </div>

          <div className="panel details-panel-c">
            <FontAwesomeIcon icon={faNotebook} />
            <div className="panel-wrapper">
              <h3>Keep Track</h3>
              <p>
                Record your encounters with other organisms all in the{" "}
                <strike>someone else's computer</strike> cloud!
              </p>
            </div>
          </div>
          <div className="panel details-panel-d">
            <FontAwesomeIcon icon={faNotebook} />
            <div className="panel-wrapper">
              <h3>Keep Track</h3>
              <p>
                Record your encounters with other organisms all in the{" "}
                <strike>someone else's computer</strike> cloud!
              </p>
            </div>
          </div>
          <div className="panel details-panel-e">
            <FontAwesomeIcon icon={faNotebook} />
            <div className="panel-wrapper">
              <h3>Keep Track</h3>
              <p>
                Record your encounters with other organisms all in the{" "}
                <strike>someone else's computer</strike> cloud!
              </p>
            </div>
          </div>
          <div className="panel details-panel-f">
            <FontAwesomeIcon icon={faNotebook} />
            <div className="panel-wrapper">
              <h3>Keep Track</h3>
              <p>
                Record your encounters with other organisms all in the{" "}
                <strike>someone else's computer</strike> cloud!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
