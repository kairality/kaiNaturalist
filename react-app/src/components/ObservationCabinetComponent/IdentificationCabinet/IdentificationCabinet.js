import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import Loader from "../../Loader/Loader";
import SingleIdentification from "./SingleIdentification";

import "./IdentificationCabinet.css"

export default function IdentificationCabinet({observation}) {
    const identifications = useSelector((state) => state.identifications);
    if (!identifications) {
        return <Loader />
    }
    if (!observation) {
        return null;
    }
    console.log(observation.identifications);
    console.log(observation.linked_identification_id);

    const identification_ids = observation.identifications.filter(ide => ide !== observation.linked_identification_id)
    if (!identification_ids || identification_ids.length === 0) {
        return null;
    }
    console.log(identification_ids)
    return <div className="identification-cabinet">
        <h2>Activity</h2>
        <SingleIdentification id={"linked-id"} identification={identifications[observation.linked_identification_id]} />
        {identification_ids.map(id => <SingleIdentification key={id} identification={identifications[id]} showControls/>)}
    </div>
}
