import "./search.css";
import { Fragment, useState } from "react";
import axios from "axios";
import resultParser from "../services/resultParser";

export default function Search({ setResults }) {
  const [artistRequest, setArtistRequest] = useState("");
  const [searchData, setSearchData] = useState("No search");
  const [searchResult, setSearchResult] = useState('')
  // const [searchRequest, setSearchRequest] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_HOST = process.env.REACT_APP_API_HOST;

  // console.log(API_KEY);

  async function getResults(e) {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: {
        term: "kiss the rain",
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
      // console.log(search);
      resultParser(search);
      // const data = await search;
      // setSearchData(data);
    } catch (err) {
      console.error(err);
    }
    // .then(function (response) {
    //   console.log(response.data);
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });
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
        <span>Song Data: {searchData}</span>
        <Results setResults{}/>
      </div>
    </Fragment>
  );
}
