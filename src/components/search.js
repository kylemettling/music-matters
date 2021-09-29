import "./search.css";
import { Fragment, useState } from "react";
import axios from "axios";
import Results from "./results";

export default function Search() {
  const [artistRequest, setArtistRequest] = useState("");

  // for custom seraching
  // const [searchData, setSearchData] = useState("No search");

  const [result, setResult] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_HOST = process.env.REACT_APP_API_HOST;

  async function getResults(e) {
    // console.log("test", artistRequest);
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: {
        term: "man in a suitcase",
        locale: "en-US",
        offset: "0",
        limit: "5",
      },
      headers: {
        "x-rapidapi-host": `${API_HOST}`,
        "x-rapidapi-key": `${API_KEY}`,
      },
    };
    try {
      const search = await axios.request(options);
      console.log(search);
      setResult(search);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <div className="searchCon">
        <h2>What song are you playing?</h2>
        <div className="search">
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
            Fetch!
          </button>
        </div>
        <Results setResult={setResult} />
      </div>
    </Fragment>
  );
}
