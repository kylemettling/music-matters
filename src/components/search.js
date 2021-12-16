import "./search.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Results from "./results";
import { shazam, spotify } from "./config/Connection";

export default function Search() {
  const [artistRequest, setArtistRequest] = useState("synchronicity");

  const [searchResult, setSearchResult] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [spotifySearchData, setSpotifySearchData] = useState("no data");
  const [spotifyToken, setSpotifyToken] = useState(undefined);
  const [optionState, setOptionState] = useState("track");
  const [searchQuery, setSearchQuery] = useState("Synchronicity II");

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  async function getSpotifyToken() {
    try {
      const res = await axios("https://accounts.spotify.com/api/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        data: "grant_type=client_credentials",
        method: "POST",
      });

      localStorage.setItem("spotifyToken", res.data.access_token);
      setSpotifyToken(res.data.access_token);
    } catch (err) {
      console.log(err);
    }
  }
  async function getSpotifySearchData() {
    if (!spotifyToken) {
      getSpotifyToken();
    }
    // console.log(spotifyToken, searchQuery, optionState);
    const res = await axios(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=${optionState}`,
      {
        headers: {
          Authorization: "Bearer " + spotifyToken,
        },
        method: "GET",
      }
    ).catch((err) => {
      console.log(err);
    });
    if (!res) {
      localStorage.removeItem("spotifyToken");
    }
    setSearchToggle(true);
    setSearchResult(res.data);
  }

  useEffect(() => {
    setSpotifyToken(localStorage.getItem("spotifyToken"));
    // console.log(spotifyToken);
    setOptionState(optionState);
  }, [spotifyToken, optionState]);

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
          token={spotifyToken}
        />
      </div>
    </Fragment>
  );
}
