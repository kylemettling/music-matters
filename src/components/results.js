import React, { useEffect, useState } from "react";
import { Tracks } from "./Track";

export default function Results({ resultList, searchName, searchToggle }) {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (searchToggle) {
      const data = resultList["data"];
      console.log(data);
      const resArtists = [data["artists"]["hits"]];
      const resTracks = [...data["tracks"]["hits"]];
      console.log(
        "🚀 ~ file: results.js ~ line 14 ~ useEffect ~ resTracks",
        resTracks
      );

      setTracks(resTracks);
    }
  }, [searchToggle, resultList]);

  return (
    <React.Fragment>
      <div className="resultCon">
        <ul>{tracks && <Tracks tracks={tracks} />}</ul>
      </div>
    </React.Fragment>
  );
}
