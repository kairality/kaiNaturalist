
import { addIdentification } from "./identification";
const ADD_OBSERVATION = "observations/addObservation";
const REMOVE_OBSERVATION = "observations/removeObservation";
const LOAD_OBSERVATIONS = "observations/loadObservations";
const VERIFY_OBSERVATION = "observations/verifyObservation";

export const addObservation = (observation) => {
  return {
    type: ADD_OBSERVATION,
    payload: observation,
  };
};

const removeObservation = (observation) => {
  return {
    type: REMOVE_OBSERVATION,
    payload: observation,
  };
};

const loadObservations = (observations) => {
  return {
    type: LOAD_OBSERVATIONS,
    payload: observations,
  };
};

export const editObservation = (observation, observationData) => async (dispatch) => {
  const f = new FormData();
  f.append("latitude", observationData.position.lat);
  f.append("longitude", observationData.position.lng);
  f.append("taxon_id", observationData.taxon?.id);
  f.append("description", observationData.description);
  f.append("date", observationData.date);
      const response = await fetch(`/api/observations/${observation.id}`, {
        method: "PATCH",
        body: f,
      });
   if (response.status >= 500) {
     return { errors: "Did you turn on the backend this time?" };
   }
   const editData = await response.json();
   if (response.ok && !response.errors) {
    console.log(editData);
     dispatch(addObservation(editData.observation));
     dispatch(addIdentification(editData.identification));
     return editData;
   } else {
    console.log('hit the errors line')
     // will have errors inside!
     return editData;
   }
};

export const createObservation = (observationData) =>
  async (dispatch) => {
    console.log('hello');
    const f = new FormData();
    f.append("latitude", observationData.position.lat);
    f.append("longitude", observationData.position.lng);
    f.append("taxon_id", observationData.taxon?.id);
    f.append("description", observationData.description);
    f.append("date", observationData.date)
    f.append("image", observationData.image)
    const response = await fetch(`/api/observations/`, {
      method: "POST",
      body: f,
    });
    if (response.status >= 500) {
      return {"errors": ["Something terrible has happened. Did you forget to turn on the backend?",]}
    }
    const observation = await response.json();
        if (observation.errors) {
          console.log(observation.errors);
          return observation;
        }
    if (response.ok) {
        dispatch(addObservation(observation.observation))
        dispatch(addIdentification(observation.identification))
        return observation;
    } else {
        console.log(observation.errors)
        return observation;
    }
  };

export const deleteObservation = (observation) => async (dispatch) => {
  const { id } = observation;
  const response = await fetch(
    `/api/observations/${id}`,
    {
      method: "DELETE",
    }
  );
  if (response.status >= 500) {
    return {"errors": ["The server was unable to process the delete request."]}
  }
  if (response.status >= 400) {
    return {
      errors: ["The server was unable to process the delete request because the object doesn't exist or you do not own it."],
    };
  }
  if (response.ok) {
    dispatch(removeObservation(observation));
    return {"message": "Successfully deleted!"}
  } else {
    return {
      errors: ["Something terrible has happened. Try again?"]
    }
  }
};

export const genObservations = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [observationsResponse] = await Promise.all([fetch("/api/observations/")]);
  const [observations] = await Promise.all([observationsResponse.json()]);
  if (observationsResponse.ok) {
    dispatch(loadObservations(observations.observations));
    return observations;
  }
};

const observationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_OBSERVATION:
      const newState = { ...state, [action.payload.id]: action.payload };
      return Object.freeze(newState);
    case REMOVE_OBSERVATION:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return Object.freeze(copyState)
    case LOAD_OBSERVATIONS:
      const observationData = {};
      for (let observation of action.payload) {
        observationData[observation.id] = observation;
      }
      return Object.freeze(observationData);
    default:
      return Object.freeze(state);
  }
};

export default observationReducer;
