import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ExifReader from "exifreader";

import UploadCalendarComponent from "../UploadCalendarComponent/UploadCalendar";
import dayjs from "dayjs";

import MapInput from "../MapInputComponent/MapInput";
import TaxaTypeahead from "../TaxaTypeaheadComponent/TaxaTypeahead";
import ImageUploader from "../ImageUploadComponent/ImageUpload";

import "./ObservationUpload.css";
import "react-datepicker/dist/react-datepicker.css";
import { createObservation, genObservations } from "../../store/observation";
import Loader from "../Loader/Loader";
import ErrorCard from "../ErrorCard/ErrorCard";

  export const YOSEMITE_COORDS = {
    //37.756718, -119.596848
    lat: 37.756718,
    lng: -119.596848,
  };

export default function ObservationUpload() {

  const [position, setPosition] = useState(YOSEMITE_COORDS);
  const [selectedTaxon, setSelectedTaxon] = useState(null);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const data = {
    position,
    taxon: selectedTaxon,
    date: dayjs(date).format("YYYY-MM-DD"),
    image,
    description,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    const observation = await dispatch(createObservation(data)).catch(
      () => {
        setErrors(["The upload service encountered an error. Please try again"])
        setLoading(false);
      },
    );
    if (observation && observation.errors) {
      setErrors(observation.errors);
      setLoading(false);
      return;
    }
    if (observation.observation) {
      setLoading(false);
      setImage(null);
      setSelectedTaxon(null);
      history.push(`/observations/${observation.observation.id}`);
      return observation.observation;
    } else {
      setErrors([
        "An unexpected error occured during upload. Please try again.",
      ]);
      return;
    }
  };

  useEffect(() => {
    if (image) {
      setErrors((prev) =>
        prev.filter((error) => !error.toLowerCase().includes("image"))
      );
    }
  }, [image]);

  return (
    <div className="upload-form-container">
      <h1>Upload Your Observation</h1>
      <form className={"observation-upload"} onSubmit={handleSubmit}>
        <div className="observation-upload-left">
          <div className={"observation-upload-photo"}>
            <ImageUploader image={image} setImage={setImage} />
          </div>
          <div className={"observation-upload-taxon upload-group"}>
            <label>Identification</label>
            <TaxaTypeahead
              selectedTaxon={selectedTaxon}
              setSelectedTaxon={setSelectedTaxon}
            />
            <p>
              Identification is required. But if you don't know what it is
              exactly, please at least select "Animal", "Plant" or "Fungi" to
              get the community started.
            </p>
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
              maxLength={300}
            />
          </div>
          <button
            className={"go-button"}
            id={"observation-submit"}
            type="submit"
          >
            Submit Observation
          </button>
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
          <ErrorCard errors={errors} />
        </div>
      </form>
    </div>
  );
}
