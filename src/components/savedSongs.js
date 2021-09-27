// import "./search.css";
import { Fragment, useState } from "react";
import Song from "../components/song";
import axios from "axios";

export default function SavedSongs() {
  //   const [artistRequest, setArtistRequest] = useState("");

  return (
    <Fragment>
      <div className="profile-container">
        <div>Saved Songs</div>
        <Song />
      </div>
    </Fragment>
  );
}
