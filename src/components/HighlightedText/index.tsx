import React from "react";

const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((key, i) => (
        <span
          key={i}
          style={
            highlight.toLowerCase().includes(key.toLowerCase())
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {key}
        </span>
      ))}
    </>
  );
};

export default HighlightedText;
