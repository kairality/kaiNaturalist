
const LOAD_TAXA = "taxonomy/loadTaxa";


const loadTaxa = (taxa) => {
  return {
    type: LOAD_TAXA,
    payload: taxa,
  };
};

export const genTaxa = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [taxaResponse] = await Promise.all([fetch("/api/taxa/")]);
  const [taxa] = await Promise.all([taxaResponse.json()]);
  if (taxaResponse.ok) {
    dispatch(loadTaxa(taxa.taxa));
    return taxa;
  }
};

const taxonomyReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TAXA:
      const taxaData = {};
      for (let taxon of action.payload) {
        taxaData[taxon.id] = taxon;
      }
      return { ...taxaData };
    default:
      return state;
  }
};

export default taxonomyReducer;
