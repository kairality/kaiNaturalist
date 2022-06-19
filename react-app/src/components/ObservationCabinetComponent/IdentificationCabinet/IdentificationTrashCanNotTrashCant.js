import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteIdentification } from "../../../store/identification";

import "./IdentificationCabinet.css";
import ErrorCard from "../../ErrorCard/ErrorCard";
import SingleIdentification from "./SingleIdentification";

export default function IdentificationTrashCanNotTrashCant({ identification }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (!sessionUser || sessionUser.id !== identification?.user_id) {
    return null;
  }
  return (
    <>
      <FontAwesomeIcon icon={faTrashCan} onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <IdentificationTrashCanNotTrashCantModal
            {...{ identification, setShowModal }}
          />
        </Modal>
      )}
    </>
  );
}

function IdentificationTrashCanNotTrashCantModal({
  identification,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const handleDelete = async (e) => {
    const deleteConfirm = await dispatch(deleteIdentification(identification));
    if (!deleteConfirm?.errors) {
      // setShowModal(false);
      history.push(`/observations/${identification.observation_id}`);
    } else {
      setErrors(deleteConfirm.errors);
    }
  };
  return (
    <div className={"observation-delete-modal"}>
      <h2>Withdraw Identification?</h2>
      <SingleIdentification {...{ identification }} />
      <button className="go-button" onClick={handleDelete}>
        Confirm Withdrawal
      </button>
      <ErrorCard errors={errors} />
    </div>
  );
}
