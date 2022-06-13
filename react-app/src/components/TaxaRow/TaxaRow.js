import React from "react";

import "./TaxaRow.css"

export default function TaxaRow({taxon}) {
    if (!taxon) {
        return null;
    }
    return (
          <div className="taxon-row">
            <img className="taxon-ta-img" src={taxon.external_url} />
            <span>
              {taxon.rank} {taxon.scientific_name} ({taxon.common_name})
            </span>
          </div>
    )

}
