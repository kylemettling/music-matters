import "./search.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Results from "./results";
import { shazam, spotify } from "./config/Connection";
import { useSpotifyToken } from "./useSpotifyToken";

export default function Search() {
  const [artistRequest, setArtistRequest] = useState("synchronicity");

  const [searchResult, setSearchResult] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  // const [spotifySearchData, setSpotifySearchData] = useState("no data");
  // const [spotifyToken, setSpotifyToken] = useState("");
  const [optionState, setOptionState] = useState("track");
  const [searchQuery, setSearchQuery] = useState("Synchronicity II");

  // token management
  const [token, { refreshToken, getStoredToken }] = useSpotifyToken();

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  async function getSpotifySearchData() {
    // if (!spotifyToken) {
    //   getSpotifyToken();
    // }
    // console.log(spotifyToken, searchQuery, optionState);
    // console.log(token);
    console.log(searchQuery, optionState);
    const res = await axios(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=${optionState}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    ).catch((err) => {
      console.log(err);
    });
    if (!res) {
      refreshToken();
      getSpotifySearchData();
    }
    setSearchToggle(true);
    setSearchResult(res.data);
    // tokenToggle();
  }

  useEffect(() => {
    getStoredToken();
    setOptionState(optionState);
  }, [optionState]);

  return (
    <Fragment>
      <div className="searchCon">
        <h2 className="search-text">What song are you playing?</h2>
        <div className="search">
          <input
            className="searchInput"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="searchSelect"
            name="search-type"
            id="search-type"
            value={optionState}
            onChange={(e) => setOptionState(e.target.value)}
          >
            <option value="track">Track</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
          <button
            className="searchButton"
            type="submit"
            onClick={(e) => getSpotifySearchData(e)}
            // onClick={(e) => getResults(e)}
          >
            Fetch!
          </button>
        </div>
        <Results
          resultList={searchResult}
          // searchName={artistRequest}
          searchToggle={searchToggle}
          token={token}
        />
      </div>
    </Fragment>
  );
}
