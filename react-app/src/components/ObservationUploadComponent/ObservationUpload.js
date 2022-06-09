import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import DatePicker from "react-datepicker"
import dayjs from "dayjs";

import MapInput from "../MapInputComponent/MapInput";
import TaxaTypeahead from "../TaxaTypeaheadComponent/TaxaTypeahead";
import ImageUploader from "../ImageUploadComponent/ImageUpload";


import "./ObservationUpload.css"
import "react-datepicker/dist/react-datepicker.css";
import { createObservation, genObservations } from "../../store/observation";


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
  const dispatch = useDispatch();


  const data = {
      position,
      taxon: selectedTaxon,
      date: dayjs(date).format('YYYY-MM-DD'),
      image,
      description
  }

  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const observation = await dispatch(createObservation(data));
    if (observation.errors) {
      setErrors(observation.errors);
      return;
    }
    if (observation && errors.length === 0) {
        return observation;
    }
  };


  return (
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
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </div>
        <button className={"go-button"} id={"observation-submit"} type="submit">
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
      </div>
    </form>
  );
}
