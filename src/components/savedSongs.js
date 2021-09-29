// import "./search.css";
import { Fragment } from "react";
import Song from "../components/song";

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
