import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonToPortal } from '@fortawesome/pro-regular-svg-icons';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button id="peace-out-yo" className="go-button" onClick={onLogout}>
    <FontAwesomeIcon icon={faPersonToPortal} /> Logout
    </button>;
};

export default LogoutButton;
