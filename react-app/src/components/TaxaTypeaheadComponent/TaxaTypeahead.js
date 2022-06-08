import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TaxonResult({taxon, selectedTaxon, setSelectedTaxon, setShowSearchSuggestions}) {
    const handleClick = (e) => {
        setSelectedTaxon(taxon)
        setShowSearchSuggestions(false)
    }
    return (
      <div onClick={handleClick}>
        {taxon.rank} {taxon.scientific_name} ({taxon.common_name})
      </div>
    );
}

function TaxonPreview({taxon}) {
     const taxa = useSelector((state) => state.taxonomy);
    const ancestry = [];
    let currentTaxon = {...taxon}
    ancestry.unshift(currentTaxon);
    console.log(currentTaxon);
    while (currentTaxon.parent) {
        const parentId = currentTaxon.parent
        const parent = {...taxa[parentId]}
        ancestry.unshift(parent)
        currentTaxon = parent;
    //     console.log(parent);
    //     ancestry.unshift(parent);
    //     currentTaxon = parent;
    }
    return <ul>
            {ancestry.map(tax => <li key={tax.scientific_name}>{tax.rank} {tax.scientific_name}</li>)}
    </ul>
}

export default function TaxaTypeahead({selectedTaxon, setSelectedTaxon}) {
    const [query, setQuery] = useState('');
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const [suggestionsData, setSuggestionsData] = useState([]);
    const taxa = useSelector((state) => state.taxonomy)

    const handleInput = (e) => {
        if (selectedTaxon) {
            setSelectedTaxon(null)
        }
        setQuery(e.target.value)
	};

    useEffect((
    ) => {
        if (query) {
            const filtered = Object.values(taxa).filter((taxon) => {
                return (
                taxon.scientific_name?.toLowerCase().includes(query.toLowerCase()) ||
                taxon.common_name?.toLowerCase().includes(query.toLowerCase())
                );
            });
            setSuggestionsData(filtered);
        } else {
          setSuggestionsData([])
        }
    }, [query, taxa])

    useEffect(() => {
        if (suggestionsData.length) {
            setShowSearchSuggestions(true);
        }
    }, [suggestionsData])

    return (
      <div>
        {selectedTaxon && <TaxonPreview taxon={selectedTaxon} />}
        <input
          className={"taxa-typeahead"}
          type="text"
          placeholder="Search taxa"
          value={selectedTaxon ? selectedTaxon.scientific_name : query }
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
            suggestionsData.map(taxon => {
              return (
                <TaxonResult taxon={taxon}
                    setSelectedTaxon={setSelectedTaxon}
                    setShowSearchSuggestions={setShowSearchSuggestions}
                >
                </TaxonResult>
              );
            })}
        </div>
      </div>
    );

}
