import {addObservation} from "./observation";

const ADD_IDENTIFICATION= "identifications/addIdentification";
const REMOVE_IDENTIFICATION = "identifications/removeIdentification";
const LOAD_IDENTIFICATIONS = "identifications/loadIdentifications";

export const addIdentification = (identification) => {
  return {
    type: ADD_IDENTIFICATION,
    payload: identification,
  };
};

const removeIdentification = (identification) => {
  return {
    type: REMOVE_IDENTIFICATION,
    payload: identification,
  };
};

const loadIdentifications = (identifications) => {
  return {
    type: LOAD_IDENTIFICATIONS,
    payload: identifications,
  };
};

export const editIdentification =
  (identification, identificationData) => async (dispatch) => {
    const f = new FormData();
    f.append("taxon_id", identificationData.taxon?.id);
    f.append("comment", identificationData.comment);
    const response = await fetch(`/api/identifications/${identification.id}`, {
      method: "PATCH",
      body: f,
    });
    if (response.status >= 500) {
      return { errors: "The server was unable to handle the request." };
    }
    const editData = await response.json();
    if (response.ok && !editData.errors) {
      dispatch(addIdentification(editData.identification));
      dispatch(addObservation(editData.observation))
      return editData;
    } else {
      // will have errors inside!
      return editData;
    }
  };

export const createIdentification = (observation, identificationData) => async (dispatch) => {
  const f = new FormData();
  f.append("observation_id", observation.id);
  f.append("taxon_id", identificationData.taxon?.id);
  f.append("comment", identificationData.comment);
  const response = await fetch(`/api/identifications/`, {
    method: "POST",
    body: f,
  });
  if (response.status >= 500) {
    return {
      errors: [
        "Something terrible has happened.",
      ],
    };
  }
  const identification = await response.json();
  if (identification.errors) {
        return identification;
  }
  if (response.ok) {
    dispatch(addIdentification(identification.identification));
    dispatch(addObservation(identification.observation));
    return identification;
  } else {
    return identification;
  }
};

export const deleteIdentification = (identification) => async (dispatch) => {
  const { id } = identification;
  const response = await fetch(`/api/identifications/${id}`, {
    method: "DELETE",
  });
  if (response.status >= 500) {
    return { errors: ["The server was unable to process the delete request."] };
  }
  if (response.status >= 400) {
    return {
      errors: [
        "The server was unable to process the delete request because the object doesn't exist or you do not own it.",
      ],
    };
  }
  const results = await response.json();
  if (results.errors) {
    return results;
  }

  if (response.ok) {
    dispatch(removeIdentification(identification));
    dispatch(addObservation(results.observation));
    return { message: "Successfully deleted!" };
  } else {
    return {
      errors: ["Something terrible has happened. Try again?"],
    };
  }
};

export const genIdentifications = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [identificationsResponse] = await Promise.all([
    fetch("/api/identifications/"),
  ]);
  const [identifications] = await Promise.all([identificationsResponse.json()]);
  if (identificationsResponse.ok) {
    dispatch(loadIdentifications(identifications.identifications));
    return identifications;
  }
};

const identificationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_IDENTIFICATION:
      const newState = { ...state, [action.payload.id]: action.payload };
      return Object.freeze(newState);
    case REMOVE_IDENTIFICATION:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return Object.freeze(copyState);
    case LOAD_IDENTIFICATIONS:
      const identificationData = {};
      for (let identification of action.payload) {
        identificationData[identification.id] = identification;
      }
      return Object.freeze(identificationData);
    default:
      return Object.freeze(state);
  }
};

export default identificationReducer;
