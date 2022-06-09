import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "../NavBar.css"


export default function UploadButton() {
    const sessionUser = useSelector((state) => state.session.user)
    if (!sessionUser) {
        return null
    }

    return (
        <NavLink
            className={"upload-button go-button"}
            to={`/observations/new`}
        >Upload</NavLink>
    );
}
