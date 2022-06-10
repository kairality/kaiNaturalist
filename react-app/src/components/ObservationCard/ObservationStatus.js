import React from "react";

function VerifiedStatus() {
    return <span className="status verified">Verified</span>
}

function NeedsIDStatus() {
    return <span className="status needs-id">Needs ID</span>
}

export default function ObservationStatus({observation}) {
    if (!observation) {
        return null;
    }
    return observation.verified ? <VerifiedStatus /> : <NeedsIDStatus />;
}
