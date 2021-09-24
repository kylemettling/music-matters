import "./search.css";
import { Fragment, useState } from "react";
import axios from "axios";

export default function Search({ setResults }) {
  const [artistRequest, setArtistRequest] = useState("");
  // const [searchRequest, setSearchRequest] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;

  console.log(API_KEY);

  async function getResults(e) {
    // setArtistRequest()
    console.log(
      `https://api.deezer.com/search?q=artist:${encodeURI(artistRequest)}`
    );
    // e.preventDefault();
    // try {
    const result = await axios.get(
      `https://api.deezer.com/search?q=artist:${encodeURI(artistRequest)}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    // const data = await result;
    console.log(result);
    setResults(result.type);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <Fragment>
      <div className="searchCon">
        <input
          className="searchInput"
          type="text"
          value={artistRequest}
          onChange={(e) => setArtistRequest(e.target.value)}
        />
        <button
          className="searchButton"
          type="submit"
          onClick={(e) => getResults(e)}
        >
          Search
        </button>
        {/* <span>{artistRequest}</span> */}
      </div>
    </Fragment>
  );
}
