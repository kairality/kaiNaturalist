import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {deleteObservation} from "../../store/observation"
import CabinetPhoto from "./CabinetPhoto";

import "./ObservationCabinet.css"
import ErrorCard from "../ErrorCard/ErrorCard";

export default function ObservationTrashCanNotTrashCant({ observation}) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (!sessionUser || sessionUser.id !== observation?.user_id) {
    return null;
  }
  return (
    <>
      <FontAwesomeIcon icon={faTrashCan} onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ObservationTrashCanNotTrashCantModal
            observation={observation}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

function ObservationTrashCanNotTrashCantModal({ observation, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const handleDelete = async (e) => {
    const deleteConfirm = await dispatch(deleteObservation(observation));
    if (!deleteConfirm?.errors) {
      // setShowModal(false);
	    history.push("/")
    } else {
      setErrors(deleteConfirm.errors)
    }
  };
  return (
    <div className={"observation-delete-modal"}>
      <h2>Delete Observation?</h2>
	  <CabinetPhoto observation={observation} />
      <button className="go-button" onClick={handleDelete}>
        Confirm Delete?
      </button>
      <ErrorCard errors={errors} />
    </div>
  );
}
