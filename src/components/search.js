import "./search.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Results from "./results";

export default function Search() {
  const [artistRequest, setArtistRequest] = useState("synchronicity");
  // for custom seraching
  // const [searchData, setSearchData] = useState("No search");

  const [result, setResult] = useState({ hits: [] });

  useEffect(() => {
    // processResults(result);
  }, [result]);

  // const processSearch = async (e) => {
  //   const data = await getResults(e);

  // };
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_HOST = process.env.REACT_APP_API_HOST;

  function processResults() {
    // console.log(result);
    // for (const track of result["data"]["tracks"]["hits"]) {
    //   console.log(track);
    // }
    // console.log(`hmm ${result["data"]["tracks"]["hits"]}`);
  }

  async function getResults(e) {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: {
        term: artistRequest,
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

      const idk = processResults(search);
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
            onClick={(e) => setResult(getResults(e))}
          >
            Fetch!
          </button>
        </div>
        <Results resultList={result} searchName={artistRequest} />
      </div>
    </Fragment>
  );
}
