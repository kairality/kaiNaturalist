import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import UploadCalendarComponent from "../UploadCalendarComponent/UploadCalendar";
import dayjs from "dayjs";

import MapInput from "../MapInputComponent/MapInput";
import TaxaTypeahead from "../TaxaTypeaheadComponent/TaxaTypeahead";
import ImageUploader from "../ImageUploadComponent/ImageUpload";


import "./ObservationUpload.css"
import "react-datepicker/dist/react-datepicker.css";
import { createObservation, genObservations } from "../../store/observation";
import Loader from "../Loader/Loader";
import ErrorCard from "../ErrorCard/ErrorCard";


export default function ObservationUpload() {
    const test = {
        lat: 37,
        lng: -122,
    };
  const [position, setPosition] = useState(test);
  const [selectedTaxon, setSelectedTaxon] = useState(null);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('test description');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();


  const data = {
      position,
      taxon: selectedTaxon,
      date: dayjs(date).format('YYYY-MM-DD'),
      image,
      description
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    const observation = await dispatch(createObservation(data));
    console.log(observation)
    if (observation && observation.errors) {
      console.log("hello")
      setErrors(observation.errors);
      setLoading(false)
      return;
    }
    if (observation.id) {
        setLoading(false)
        setImage(null)
        setSelectedTaxon(null)
        history.push(`/observations/${observation.id}`)
        return observation;
    } else {
      setErrors(["An error occured during upload. Please try again. Did you forget to start the backend again?"])
      return;
    }
  };

  useEffect(() => {
    if (image) {
      setErrors(prev => prev.filter(error => !error.toLowerCase().includes("image")))
    }
  }, [image])


  return (
    <div className="upload-form-container">
      <h1>Upload Your Observation</h1>
      <form className={"observation-upload"} onSubmit={handleSubmit}>
        <div className="observation-upload-left">
          <div className={"observation-upload-photo"}>
            <ImageUploader image={image} setImage={setImage} />
          </div>
          <div className={"observation-upload-taxon"}>
            <TaxaTypeahead
              selectedTaxon={selectedTaxon}
              setSelectedTaxon={setSelectedTaxon}
            />
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
          <button
            className={"go-button"}
            id={"observation-submit"}
            type="submit"
          >
            Submit Observation
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
