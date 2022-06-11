import React, { useState } from "react";
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
    const [position, setPosition] = useState({lat: observation?.latitude, lng: observation?.longitude});
    const [selectedTaxon, setSelectedTaxon] = useState(taxa[observation.taxon_id]);
    const [date, setDate] = useState(new Date(observation.date));
    const [description, setDescription] = useState(observation.description);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);


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
          <div className={"observation-upload-taxon"}>
            <label>Select Identification</label>
            <TaxaTypeahead
              selectedTaxon={selectedTaxon}
              setSelectedTaxon={setSelectedTaxon}
            />
          </div>
          <div className={"observation-upload-photo"}>
            <CabinetPhoto observation={observation} />
          </div>
          <div className={"observation-upload-date"}>
            <UploadCalendarComponent
              date={date}
              setDate={setDate}
              maxDate={new Date()}
            />
          </div>
          <div className={"observation-descrtiption"}>
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
              />
            )}
          </div>
          {loading && <Loader />}
        </div>
      </form>
    </div>
  );
}
