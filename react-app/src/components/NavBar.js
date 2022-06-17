import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import LogoutButton from "./auth/LogoutButton";
import UploadButton from "./UploadButton/UploadButton";
import "./NavBar.css";
import { RandomNaturalistIcon } from "./Loader/Loader";
import ProfileMenu from "./ProfileMenu";

export default function NavBar() {
  const sessionUser = useSelector((state) => state.session.user);
  const loggedOut = !sessionUser;

  let sessionLinks;
  if (!loggedOut) {
    sessionLinks = [
      <NavLink key="explore" activeClassName="active-nav" className="go-button" exact to="/explore">
        Explore (β)
      </NavLink>,
      <li key="upload">
        <UploadButton />
      </li>,
      <li key="menu">
        <ProfileMenu />
      </li>,
    ];
  } else {
    sessionLinks = [
      <NavLink to="/login" className="go-button" exact={true} activeClassName="active">
        Login
      </NavLink>,
      <NavLink to="/sign-up" className="go-button" exact={true} activeClassName="active">
        Sign Up
      </NavLink>,
    ];
  }

  return (
    <nav>
      <ul className={loggedOut ? "loggedOutNav" : ""}>
        <li className="home-logo" key="logo">
          <span className="logo">
            <RandomNaturalistIcon />{" "}
            <span className="logo-inner">Naturalist</span>
          </span>
          <NavLink
            className="go-button"
            activeClassName="active-nav"
            exact
            to="/"
          >
            Home
          </NavLink>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

// export default NavBar;
