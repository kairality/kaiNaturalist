import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import ErrorCard from "../ErrorCard/ErrorCard";
import "./LoginForm.css";

import birdwing2 from "../../images/birdwing2.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faUser,
  faLockKeyhole,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/pro-regular-svg-icons";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [pwMatch, setPwMatch] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (password && repeatPassword) {
      setPwMatch(password === repeatPassword);
    }
  }, [password, repeatPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Both passwords must match, please try again"]);
    }
  };

  const toLogin = async (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-wrapper">
      <div
        className="signup-cover"
        style={{ backgroundImage: `url("${birdwing2}")` }}
      >
        <div className="attribution">
          <a
            href="https://commons.wikimedia.org/w/index.php?curid=39704554"
            target="_blank"
            referrer="noreferrer"
          >
            Photo By Peellden - Own work, CC BY-SA 4.0
          </a>
        </div>
      </div>
      <div className="signup-form-wrapper">
        <form className="auth-form" onSubmit={onSignUp}>
          <div className="login-text">
            <h3 id="h3-login">Are you ready to explore nature?</h3>
            <h4 id="h4-login">Sign up to begin your journey of discovery.</h4>
          </div>
          <ErrorCard errors={errors} />
          <h5 id="h4-login">All fields are required.</h5>
          <div className="auth-fields">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                placeholder="Username"
                value={username}
                required={true}
              />
              <FontAwesomeIcon id="user-icon" icon={faUser} />
            </div>
          </div>
          <div className="auth-fields">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                required={true}
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
                required={true}
              />
              <FontAwesomeIcon id="pw-icon" icon={faLockKeyhole} />
            </div>
          </div>
          <div className="auth-fields">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="repeat_password"
                placeholder="Confirm Password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
              <FontAwesomeIcon
                id={pwMatch ? "pw-ok" : "pw-no"}
                icon={pwMatch ? faCircleCheck : faCircleXmark}
              />
            </div>
            <div id="signup-button">
              <button className="go-button" type="submit">
                Sign Up
              </button>
            </div>
            <p>Don't have an account?</p>
            <button
              type="button"
              id="to-log-in"
              className="go-button"
              onClick={toLogin}
            >
              Log in!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
