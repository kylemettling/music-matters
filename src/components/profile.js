// import "./search.css";
import { Fragment, useState } from "react";
import axios from "axios";

export default function Profile() {
  //   const [artistRequest, setArtistRequest] = useState("");

  async function getResults(e) {
    // console.log(
    //   `https://api.deezer.com/search?q=artist:${encodeURI(artistRequest)}`
    // );
    // const result = await axios.get(
    //   `https://api.deezer.com/search?q=artist:${encodeURI(artistRequest)}`,
    //   {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // );
    // console.log(result);
    // setResults(result.type);
  }

  return (
    <Fragment>
      <div className="profile-container">
        <div>Profile Placehold</div>
        <div>Saved Songs</div>
      </div>
    </Fragment>
  );
}
