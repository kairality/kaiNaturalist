import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { editObservation } from "../../store/observation";
import CabinetPhoto from "./CabinetPhoto";
import TaxaTypeahead from "../TaxaTypeaheadComponent/TaxaTypeahead";
import MapInput from "../MapInputComponent/MapInput";
import ErrorCard from "../ErrorCard/ErrorCard";
import UploadCalendarComponent from "../UploadCalendarComponent/UploadCalendar";
import SingleIdentification from "./IdentificationCabinet/SingleIdentification";
import Loader from "../Loader/Loader";
import dayjs from "dayjs";

import "./ObservationCabinet.css";
import "./ObservationEdit.css"

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
    const taxa = useSelector((state) => state.taxonomy);
    const identifications = useSelector((state) => state.identifications);

        const linked_identification_id = observation.linked_identification_id;
        const linked_identification =
          identifications?.[linked_identification_id];

    const [position, setPosition] = useState({lat: observation?.latitude, lng: observation?.longitude});
    const [selectedTaxon, setSelectedTaxon] = useState(taxa[linked_identification?.taxon_id]);
    const [date, setDate] = useState(new Date(observation.date));
    const [description, setDescription] = useState(observation.description);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [identificationPreview, setIdentificationPreview] = useState(linked_identification);

    useEffect(() => {
      const rebuild = (preview) => {
        const copyState = { ...preview };
        copyState.taxon_id = selectedTaxon.id;
        return copyState;
      };
      if (selectedTaxon) {
        setIdentificationPreview(prevState => rebuild(prevState))
      }
    }, [selectedTaxon])

    const data = {
      position,
      taxon: selectedTaxon,
      date: dayjs(date).format("YYYY-MM-DD"),
      description,
    };

  const handleEdit = async (e) => {
    e.preventDefault();
    const editConfirm = await dispatch(editObservation(observation, data))
    console.log(editConfirm);
    console.log(editConfirm.errors);
    if (editConfirm && !editConfirm.errors) {
      setShowModal(false);
    } else {
      setErrors(editConfirm.errors)
    }
  };

  if (!observation || !taxa) {
    return null;
  }


  return (
    <div className={"observation-edit-modal"}>
      <h2>Update your Observation</h2>
      <p>
        You can't change the photo. If you want to change the photo, delete it
        and upload a new one.
      </p>
      <form className={"observation-edit"} onSubmit={handleEdit}>
        <div className="observation-upload-left">
          <div className={"observation-upload-taxon upload-group"}>
            <label>Select Identification</label>
            <TaxaTypeahead
              selectedTaxon={selectedTaxon}
              setSelectedTaxon={setSelectedTaxon}
            />
            <p>
              This will not modify the community's identification directly. Your
              identification will be updated and the community consensus will be
              recalculated (if necessary) for this observation.
            </p>
          </div>
          <div className={"observation-upload-photo"}>
            <CabinetPhoto observation={observation} />
          </div>
          <div className={"observation-upload-date upload-group"}>
            <label>Observation Date</label>
            <UploadCalendarComponent
              date={date}
              setDate={setDate}
              maxDate={new Date()}
            />
          </div>
          <div className={"observation-descrtiption upload-group"}>
            <label>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submut" className="go-button">
            Confirm Edit
          </button>
          <ErrorCard errors={errors} />
        </div>
        <div className={"observation-upload-right"}>
          <div className={"observation-upload-map"}>
            {position && (
              <MapInput
                position={position}
                onPositionChanged={(latlng) => setPosition(latlng)}
                editMode
              />
            )}
          </div>
          <div className="identification-preview-edit">
            <label>Your identification</label>
            {identificationPreview && (
              <SingleIdentification identification={identificationPreview} />
            )}
          </div>
          {loading && <Loader />}
        </div>
      </form>
    </div>
  );
}
