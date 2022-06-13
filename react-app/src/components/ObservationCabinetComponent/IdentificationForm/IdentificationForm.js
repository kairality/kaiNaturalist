import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createIdentification } from "../../../store/identification";
import ErrorCard from "../../ErrorCard/ErrorCard";

import TaxaTypeahead from "../../TaxaTypeaheadComponent/TaxaTypeahead";


export default function IdentificationForm({observation, agreeing_taxon, identification}) {
    const taxa = useSelector((state) => state.taxonomy);
    const identifications = useSelector((state) => state.identifications);
    
    const user = useSelector((state) => state.session.user);
    const [selectedTaxon, setSelectedTaxon] = useState(identification ? taxa?.[identification.taxon_id] : null);
    const [comment, setComment] = useState(identification ? identification.comment : '');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const data = {
        taxon: selectedTaxon,
        comment,
    };
    console.log(data);

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
  if (!observation || !user || !identifications) {
    return null;
  }

  console.log(observation)
  console.log(observation.identifications);
  console.log(observation.identifications.map(id => id));

  const existing_ids = observation.identifications.map(id => identifications[id]);
  console.log(existing_ids);
  const my_id = existing_ids.find(idt => idt?.user_id === user.id)
  if (my_id) {
    return null;
  }

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
