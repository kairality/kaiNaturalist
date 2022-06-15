import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/session"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfileMenu.css";
import LogoutButton from "./auth/LogoutButton";
import UserAvatar from "./UserAvatarComponent/UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/pro-duotone-svg-icons";

export default function ProfileMenu() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="profile-top" onClick={openMenu}>
        <div className="profileControls">
          <UserAvatar {...{user}} />
          <FontAwesomeIcon icon={faCircleChevronDown} />
        </div>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
                <LogoutButton />
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
