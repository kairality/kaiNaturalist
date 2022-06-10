import React from "react";

import "./ErrorCard.css"

export default function ErrorCard({errors}) {
    if (!errors || errors.length === 0) {
        return null;
    }
    let content;
    if (errors.length === 1) {
        content = <span className="single-error">{errors[0]}</span>
    } else {
        const errorsItems = errors.map(error => <li key={error}>{error}</li>)
        content = <ul className="multiple-errors">{errorsItems}</ul>
    }
    return (
        <div className="error-card">
            {content}
        </div>
    )
}
