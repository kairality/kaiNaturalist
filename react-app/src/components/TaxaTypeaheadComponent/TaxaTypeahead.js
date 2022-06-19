import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TaxaTypeahead.css";

function TaxonResult({
  taxon,
  selectedTaxon,
  setSelectedTaxon,
  setShowSearchSuggestions,
}) {
  const handleClick = (e) => {
    setSelectedTaxon(taxon);
    setShowSearchSuggestions(false);
  };
  return (
    <div onClick={handleClick}>
      <img className="taxon-ta-img" src={taxon.external_url} />
      <span>
        {taxon.rank} {taxon.scientific_name}
        {taxon.common_name ? ` (${taxon.common_name})` : ""}
      </span>
    </div>
  );
}

function TaxonPreview({ taxon }) {
  const taxa = useSelector((state) => state.taxonomy);
  const ancestry = [];
  let currentTaxon = { ...taxon };
  ancestry.unshift(currentTaxon);
  while (currentTaxon.parent) {
    const parentId = currentTaxon.parent;
    const parent = { ...taxa[parentId] };
    ancestry.unshift(parent);
    currentTaxon = parent;
  }
  return (
    <ul>
      {ancestry.map((tax) => (
        <li key={tax.scientific_name}>
          {tax.rank} {tax.scientific_name}
        </li>
      ))}
    </ul>
  );
}

export default function TaxaTypeahead({
  selectedTaxon,
  setSelectedTaxon,
  maxResults = 5,
}) {
  const [query, setQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState([]);
  const taxa = useSelector((state) => state.taxonomy);

  const handleInput = (e) => {
    if (selectedTaxon) {
      setSelectedTaxon(null);
    }
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query) {
      const filtered = Object.values(taxa).filter((taxon) => {
        return (
          taxon.scientific_name?.toLowerCase().includes(query.toLowerCase()) ||
          taxon.common_name?.toLowerCase().includes(query.toLowerCase())
        );
      });
      setSuggestionsData(maxResults ? filtered.slice(0, maxResults) : filtered);
    } else {
      setSuggestionsData([]);
    }
  }, [query, taxa, maxResults]);

  useEffect(() => {
    if (suggestionsData.length) {
      setShowSearchSuggestions(true);
    }
  }, [suggestionsData]);

  useEffect(() => {
    if (!selectedTaxon) {
      setQuery("");
    }
  }, [selectedTaxon]);

  return (
    <div className="taxa-typeahead-container">
      {selectedTaxon && <TaxonPreview taxon={selectedTaxon} />}
      <input
        className={"taxa-typeahead"}
        type="text"
        placeholder="Search taxa"
        value={selectedTaxon ? selectedTaxon.scientific_name : query}
        onChange={handleInput}
      />
      <div
        className={
          suggestionsData.length && showSearchSuggestions
            ? "taxa-results"
            : "taxa-results-hidden"
        }
      >
        {suggestionsData.length &&
          showSearchSuggestions &&
          suggestionsData.map((taxon) => {
            return (
              <TaxonResult
                taxon={taxon}
                setSelectedTaxon={setSelectedTaxon}
                setShowSearchSuggestions={setShowSearchSuggestions}
              ></TaxonResult>
            );
          })}
      </div>
    </div>
  );
}
