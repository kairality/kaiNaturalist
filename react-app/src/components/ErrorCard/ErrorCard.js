import React from "react";
import errorMessageTranslator from "./errorFormatter";

import "./ErrorCard.css"
import errorFormatter from "./errorFormatter";

export default function ErrorCard({errors}) {
    if (!errors || errors.length === 0) {
        return null;
    }
    let content;
    if (typeof errors === "string") {
        content = <span className="single-error">{errors}</span>
    } else {
        const errorsItems = errors.map(error => <li key={error}>{errorFormatter(error)}</li>)
        content = <ul className="multiple-errors">{errorsItems}</ul>
    }
    return (
        <div className="error-card">
            <h3>There were errors with your submission</h3>
            {content}
        </div>
    )
}
