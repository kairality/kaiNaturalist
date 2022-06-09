import React from "react";


export default function CabinetPhoto({observation}) {
    if (!observation) {
        return null;
    }
    return <img className="cabinet-photo-image" src={observation.img_url} />;
}
