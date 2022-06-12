import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import LogoutButton from "./auth/LogoutButton";
import UploadButton from "./UploadButton/UploadButton";
import "./NavBar.css";
import { RandomNaturalistIcon } from "./Loader/Loader";

export default function NavBar() {
  const sessionUser = useSelector((state) => state.session.user);
  const loggedOut = !sessionUser;

  let sessionLinks;
  if (!loggedOut) {
    sessionLinks = [
      <li key="upload">
        <UploadButton />
      </li>,
      <li key="logout">
        <LogoutButton />
      </li>,
    ];
  } else {
    sessionLinks = [
      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>,
      <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
      </NavLink>,
    ];
  }

  return (
    <nav>
      <ul className={loggedOut ? "loggedOutNav" : ""}>
        <li key="logo">
          <span className="logo">
            <RandomNaturalistIcon />{" "}
            <span className="logo-inner">Naturalist</span>
          </span>
        </li>
        <li key="home">
          <NavLink className="homeButton" exact to="/">
            Home
          </NavLink>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

// export default NavBar;
