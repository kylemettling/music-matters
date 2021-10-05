import React, { useEffect, useState } from "react";
import { Result } from "./Result";
import { Track } from "./Track";

export default function Results({ resultList, searchName, searchToggle }) {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (searchToggle) {
      const data = resultList["data"];
      // console.log(data);
      const resTracks = [...data["tracks"]["hits"]].map(
        ({ track: res }) => res
      );
      const resArtists = data["artists"]["hits"].map(({ artist: res }) => res);

      setTracks(resTracks);
      setArtists(resArtists);
    }
  }, [searchToggle, resultList]);

  return (
    <React.Fragment>
      <div className="resultCon">
        {/* <Track track={(tracks[0])} /> */}
        <ul className="results tracks">{<Result results={tracks} />}</ul>
        <ul className="results artists">{<Result results={artists} />}</ul>
      </div>
    </React.Fragment>
  );
}
