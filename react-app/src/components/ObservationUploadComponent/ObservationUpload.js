import React, { useState, useEffect } from "react";
import MapInput from "../MapInputComponent/MapInput";
import TaxaTypeahead from "../TaxaTypeaheadComponent/TaxaTypeahead";
import ImageUploader from "../ImageUploadComponent/ImageUpload";

export default function ObservationUpload() {
    const test = {
        lat: 37,
        lng: -122,
    };
  const [position, setPosition] = useState(test);
  const [selectedTaxon, setSelectedTaxon] = useState(null);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');


  const data = {
      position,
      taxonId: selectedTaxon?.id,
      date,
      image,
      description
  }

  console.log(data)

  return (
      <form>
          {position && <MapInput position={position} onPositionChanged={(latlng) => setPosition(latlng)} />}
          <TaxaTypeahead selectedTaxon={selectedTaxon} setSelectedTaxon={setSelectedTaxon}/>
          <ImageUploader image={image} setImage={setImage} />
      </form>
  );
}
