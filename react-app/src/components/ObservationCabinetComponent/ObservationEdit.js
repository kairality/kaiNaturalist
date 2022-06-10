import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { editObservation } from "../../store/observation";
import CabinetPhoto from "./CabinetPhoto";

import "./ObservationCabinet.css";

export default function ObservationEdit({ observation }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (!sessionUser || sessionUser.id !== observation?.user_id) {
    return null;
  }
  return (
    <>
      <FontAwesomeIcon icon={faEdit} onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ObservationEditModal
            observation={observation}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

function ObservationEditModal({ observation, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const handleEdit = async (e) => {
    const editConfirm = await dispatch(editObservation(observation))
    if (!editConfirm?.errors) {
      setShowModal(false);
    } else {
      setErrors(editConfirm.errors)
    }
  };
  return (
    <div className={"observation-edit-modal"}>
      <h2>Delete Observation?</h2>
      <CabinetPhoto observation={observation} />
      <button className="go-button" onClick={handleEdit}>
        Confirm Edit
      </button>
    </div>
  );
}
