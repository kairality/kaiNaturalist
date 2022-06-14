import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import ErrorCard from "../ErrorCard/ErrorCard";
import DemoLogin from "./DemoLogin";

import "./LoginForm.css";

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
      <div className="splash">
        Test content
      </div>
      <div className="splash-border">
        kaiNaturalist is not a joint initiative with anyone.
      </div>
      <form className="auth-form" onSubmit={onLogin}>
        <div className="login-text">
          <h3 id="h3-login">Connect with nature</h3>
          <h4 id="h4-login">But first, you must connect to your account.</h4>
        </div>
        <div className="form-errors center">
          <ErrorCard {...{ errors }} />
        </div>
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
              <DemoLogin />
            </div>
            <p>Don't have an account?</p>
            <button id="to-sign-up" className="go-button" onClick={() => {}}>
              Sign up!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
