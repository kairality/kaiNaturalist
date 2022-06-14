import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import ErrorCard from "../ErrorCard/ErrorCard";
import DemoLogin from "./DemoLogin";

import { faNarwhal, faUserBountyHunter, faCommentsQuestionCheck } from "@fortawesome/pro-solid-svg-icons";

import toucan from '../../images/toucan.jpg'

import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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
          {errors.length > 0 && <div className="form-errors">
            <ErrorCard {...{ errors }} />
          </div>}
          <div className="auth-fields">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="auth-fields">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <div>
              <div className="login-buttons">
                <button className="go-button" type="submit">
                  Login
                </button>
                <DemoLogin {...{setErrors}} />
              </div>
              <p>Don't have an account?</p>
              <button id="to-sign-up" className="go-button" onClick={() => {}}>
                Sign up!
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="splash-border">
        kaiNaturalist is not a joint initiative with anyone.
      </div>
      <div className="how-it-works">
        <h2>How it Works</h2>
        <div className="how-it-works-inner">
          <div className="how-it-works-panel">
            <div className="hiw-icon">
              <FontAwesomeIcon icon={faNarwhal} />
            </div>
            <h3>Record Your Observations</h3>
          </div>
          <div className="how-it-works-panel">
            <div className="hiw-icon">
              <FontAwesomeIcon icon={faUserBountyHunter} />
            </div>
            <h3>Share With Fellow Naturalists</h3>
          </div>
          <div className="how-it-works-panel">
            <div className="hiw-icon">
              <FontAwesomeIcon icon={faCommentsQuestionCheck} />
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
        <img className="contribute-photo" src={toucan} />
      </div>
    </div>
  );
};
