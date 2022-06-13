import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


import { Modal } from "../../../context/Modal";
import { createIdentification, editIdentification } from "../../../store/identification";
import TaxaTypeahead from "../../TaxaTypeaheadComponent/TaxaTypeahead";
import ErrorCard from "../../ErrorCard/ErrorCard";
import SingleIdentification from "./SingleIdentification";
import Loader from "../../Loader/Loader";

import "./IdentificationCabinet.css";

export default function IdentificationEdit({ identification }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (!sessionUser || sessionUser.id !== identification?.user_id) {
    return null;
  }

  return (
    <>
      <FontAwesomeIcon icon={faEdit} onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <IdentificationEditModal
            {...{identification, setShowModal}}
          />
        </Modal>
      )}
    </>
  );
}

function IdentificationEditModal({ identification, setShowModal }) {
  const dispatch = useDispatch();
  const taxa = useSelector((state) => state.taxonomy);

  const [selectedTaxon, setSelectedTaxon] = useState(
    taxa[identification.taxon_id]
  );
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [identificationPreview, setIdentificationPreview] = useState(
    identification
  );
  const [comment, setComment] = useState(identification.comment);

  useEffect(() => {
    const rebuild = (preview) => {
      const copyState = { ...preview };
      copyState.taxon_id = selectedTaxon.id;
      copyState.comment = comment;
      return copyState;
    };
    if (selectedTaxon) {
      setIdentificationPreview((prevState) => rebuild(prevState));
    }
  }, [selectedTaxon, comment]);

  const data = {
    taxon: selectedTaxon,
    comment: comment,
  };

  console.log(data);

  const handleEdit = async (e) => {
    e.preventDefault();
    const editConfirm = await dispatch(editIdentification(identification, data));
    console.log(editConfirm);
    console.log(editConfirm.errors);
    if (editConfirm && !editConfirm.errors) {
      setShowModal(false);
    } else {
      setErrors(editConfirm.errors);
    }
  };

  if (!identification|| !taxa) {
    return null;
  }

  return (
    <div className={"identification-edit-modal"}>
      <h2>Update your Identification</h2>
      <form className="identification-add-form" onSubmit={handleEdit}>
        <TaxaTypeahead {...{ selectedTaxon, setSelectedTaxon }} />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SingleIdentification identification={identificationPreview} />
        <button className="go-button">Add Identification</button>
        <ErrorCard {...{ errors }} />
      </form>
    </div>
  );
}
