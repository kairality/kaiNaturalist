export const TaxonomyRank = Object.freeze({
  KINGDOM: Symbol.for("KINGDOM"),
  PHYLUM: Symbol.for("PHYLUM"),
  CLASS: Symbol.for("CLASS"),
  ORDER: Symbol.for("ORDER"),
  FAMILY: Symbol.for("FAMILY"),
});

export const TaxonomyHierarchy = [
    TaxonomyRank.FAMILY,
    TaxonomyRank.ORDER,
    TaxonomyRank.CLASS,
    TaxonomyRank.PHYLUM,
    TaxonomyRank.KINGDOM
];

export const getTaxonomyPosition = (rank) => TaxonomyHierarchy.indexOf(rank);

export const ConsensusType = Object.freeze({
  CONSENSUS: Symbol.for("Community Consensus ID"),
  OVERLAPPING: Symbol.for("Overlapping ID"),
  MAVERICK: Symbol.for("Maverick ID"),
  NO_CONSENSUS: Symbol.for("No consensus ID"),
  REFINEMENT: Symbol.for("Refining ID"),
});

export const getRank = (taxon) => TaxonomyRank[taxon.rank];

export const taxonomyWalkUp = (taxa, taxon) => {
    let currentTaxon = {...taxon};
    console.log("*****  ")
    console.log(currentTaxon)
    const ancestry = new Set();
    while (currentTaxon.parent) {
        const parentId = currentTaxon.parent;
        const parent = { ...taxa[parentId] };
        ancestry.add(parentId);
        currentTaxon = parent;
    }
    return ancestry;
};

export const getConsensusType = (taxa, observation, identification) => {
    // bail out if there's no consensus or the data isn't available
    if (!observation.community_taxon_id || !taxa || !identification) {
        return ConsensusType.NO_CONSENSUS;
    }

    const observationTaxonId = observation.community_taxon_id;
    const idTaxonId = identification.taxon_id;

    // if the IDs are exactly the same, then it's a consensus match
    if (observationTaxonId === idTaxonId) {
       return ConsensusType.CONSENSUS;
    }
    console.log(taxa);
    const communityTaxon = taxa[observationTaxonId];
    console.log(communityTaxon);
    const communityTaxonRank = getRank(communityTaxon);
    const idTaxon= taxa[idTaxonId];
    const idTaxonRank = getRank(idTaxon);

    // this would be, e.g., two different families
    if (communityTaxonRank === idTaxonRank) {
        return ConsensusType.MAVERICK;
    }

    const communityPosition = getTaxonomyPosition(communityTaxonRank);
    const idPosition = getTaxonomyPosition(idTaxonRank);

    const lowerTaxon = idPosition < communityPosition ? idTaxon : communityTaxon;
    const higherTaxon = idPosition < communityPosition ? communityTaxon : idTaxon;

    const idIsLower = lowerTaxon.id === idTaxon.id;
    // console.log(idIsLower, "idIsLower")

    // console.log(lowerTaxon)

    const ancestryTree = taxonomyWalkUp(taxa, lowerTaxon)
    // console.log("---------------------")
    // console.log(ancestryTree);
    // console.log(higherTaxon.id);

    const isOverlap = ancestryTree.has(higherTaxon.id);

    // id is lower + overlap true --> REFINEMENT
    // id is lower + overlap false  --> MAVERICK
    // id is HIGHER + overlap true -> OVERLAP
    // id is HIGHER + overlap false --> MAVERICK

    if (!isOverlap) {
        return ConsensusType.MAVERICK;
    } else {
        return idIsLower ? ConsensusType.REFINEMENT : ConsensusType.OVERLAPPING;
    }


}
