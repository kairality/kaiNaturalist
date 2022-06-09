import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


export default function UploadButton() {
    const sessionUser = useSelector((state) => state.session.user)
    if (!sessionUser) {
        return null
    }

    return (
      <>
        <NavLink
            className={"upload-button"}
            to={`/observations/new`}
        >Upload</NavLink>
      </>
    );
}
