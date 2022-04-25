import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSpotifyToken } from "./hooks";
import { useAppState } from "../state";
import axios from "axios";
import { Result } from "./Result";
import "./results.css";
import { Helmet } from "react-helmet";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Results() {
  const [results, setResults] = useState([]);
  const {
    token,
    refreshToken,
    getStoredToken,
    isTrackActive,
    clearTrackData,
    getScaleChords,
  } = useAppState();

  let query = useQuery();

  async function getSpotifySearchData(e) {
    if (!query) {
      return;
    }

    if (!token) {
      refreshToken();
    }
    const res = await axios(
      `https://api.spotify.com/v1/search?q=${query.get("q")}&type=track`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    ).catch((err) => {
      if (err.status === 401) {
        refreshToken();
        getSpotifySearchData();
      }
      console.log("Error!!", err);
    });
    if (!res) {
      refreshToken();
      getSpotifySearchData();
    }
    const data = res.data["tracks"]?.items;
    setResults(data);
  }

  useEffect(() => {
    getSpotifySearchData();
  }, [query]);

  if (!query) return null;

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Results | {`'${query.get("q")}'`}</title>
        <meta name="description" content="Music Matters - Audio Arranged" />
      </Helmet>
      {results && (
        <ul className="results grid">
          {results &&
            results.map((track, i) => (
              <Result
                key={i}
                index={i}
                track={track}
                type="track"
                token={token}
              />
            ))}
        </ul>
      )}
      {/* <div>{query.get('search')}huh</div> */}
    </React.Fragment>
  );
}
