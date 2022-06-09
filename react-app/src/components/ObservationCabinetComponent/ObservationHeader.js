import React from "react";
import {useSelector} from "react-redux"
import {titleCase} from "title-case"

function CommonNameHeader({taxon}) {
    if (!taxon) {
        return null;
    }
    const scientific = titleCase(taxon.scientific_name);
    const common = taxon.common_name ? titleCase(taxon.common_name) : scientific;
    return taxon.common_name ? <h2 className="sci-name-header">{common}</h2> : <h2 className="sci-name-header">{scientific}</h2>;
}

export default function ObservationHeader({observation}) {
    const taxa = useSelector((state) => state.taxonomy)
    const sad_taxon = {
        scientific_name: "Unidentified",
        common_name: "Unidentified",
    }

    const taxon = observation.taxon_id ? taxa?.[observation.taxon_id] : sad_taxon;
    return (
        <CommonNameHeader taxon={taxon} />
    )
}
