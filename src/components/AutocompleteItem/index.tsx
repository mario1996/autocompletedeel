import React from "react";
import "./index.css";
import HighlightedText from "../HighlightedText";

const AutocompleteItem = ({
  text,
  inputValue,
  onSelect,
}: {
  text: string;
  inputValue: string;
  onSelect: (text: string) => void;
}) => {
  return (
    <li key={text} className="autocompleteItem">
      <button onClick={() => onSelect(text)}>
        <HighlightedText text={text} highlight={inputValue} />
      </button>
    </li>
  );
};

export default AutocompleteItem;
