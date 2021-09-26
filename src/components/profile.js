// import "./search.css";
import { Fragment, useState } from "react";
import SavedSongs from "../components/savedSongs";
import axios from "axios";

export default function Profile() {
  //   const [artistRequest, setArtistRequest] = useState("");

  return (
    <Fragment>
      <div className="profile-container">
        <div>Profile Placehold</div>
        <div>Saved Songs</div>
        <SavedSongs />
      </div>
    </Fragment>
  );
}
