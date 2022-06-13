import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import Loader from "../../Loader/Loader";
import SingleIdentification from "./SingleIdentification";

export default function IdentificationCabinet({observation}) {
    const identifications = useSelector((state) => state.identifications);
    if (!identifications) {
        return <Loader />
    }
    const identification_ids = observation.identifications;
    if (!identification_ids || identification_ids.length === 0) {
        return null;
    }
    return <div>
        {identification_ids.map(id => <SingleIdentification identification={identifications[id]} />)}
    </div>
}
