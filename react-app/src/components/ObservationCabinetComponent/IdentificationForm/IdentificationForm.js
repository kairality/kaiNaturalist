import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createIdentification } from "../../../store/identification";
import ErrorCard from "../../ErrorCard/ErrorCard";

import TaxaTypeahead from "../../TaxaTypeaheadComponent/TaxaTypeahead";


export default function IdentificationForm({observation, agreeing_taxon, identification}) {
    const taxa = useSelector((state) => state.taxonomy);
    const [selectedTaxon, setSelectedTaxon] = useState(identification ? taxa?.[identification.taxon_id] : null);
    const [comment, setComment] = useState(identification ? identification.comment : '');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const data = {
        taxon: selectedTaxon,
        comment,
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    const results = await dispatch(createIdentification(observation, data))
    console.log(results);
    if (results && results.errors) {
      console.log("hello");
      setErrors(results.errors)
      setLoading(false);
      return;
    }
    if (results.identification) {
      setLoading(false);
      setSelectedTaxon(null);
      setComment(null)
      return results.identification;
    } else {
      setErrors([
        "An unexpected error occured while creating an identification. Please try again",
      ]);
      return;
    }
  };

   console.log(errors);

    return (
    <form className="identification-add-form" onSubmit={handleSubmit}>
        <TaxaTypeahead {...{ selectedTaxon, setSelectedTaxon }} />
        <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        <button className="go-button">Add Identification</button>
        <ErrorCard {...{errors}} />
    </form>
    );
}