// import "./search.css";
import { Fragment } from "react";
import SavedSongs from "../components/savedSongs";

export default function Profile() {
  //   const [artistRequest, setArtistRequest] = useState("");

  return (
    <Fragment>
      <div className="profile-container">
        <SavedSongs />
      </div>
    </Fragment>
  );
}
