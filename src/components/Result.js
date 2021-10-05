import React from "react";
import "./results.css";
import { useEffect } from "react";

export function Result({ results }) {
  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div style={{ width: "400px" }}>
      {results &&
        results.map((hit) => (
          <ul className="resultItem">
            <h3 key={hit.id || hit.key}>{hit.title || hit.name}</h3>
            <h4 className="resultTitle">{hit.subtitle || hit.name}</h4>
            <img
              className="resultCoverArt"
              src={hit.avatar || hit.images.background}
              alt={hit.title || hit.name + " cover"}
            ></img>
          </ul>
        ))}
    </div>
  );
}
