import { useState, useEffect } from "react";
import { useAppState } from "../../state";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { spotify } from "../config/Connection";
import axios from "axios";

// export const useTrack = () => {
//   const [isActiveTrack, setIsActiveTrack] = useState(false);
//   const { token, refreshToken, getStoredToken } = useAppState();

//   const [artistCover, setArtistCover] = useState({
//     url: "",
//     h: "",
//     w: "",
//   });
//   const history = useHistory();
//   function setTrackFeatures(data) {
//     setSongKey(data.key);
//     setSongMode(data.mode);
//   }

//   const clearTrackData = () => {
//     setSpotifySongId("");
//     setSongTitle("");
//     setSongArtist("");
//     setSongAlbum("");
//     setAlbumCoverURL("");
//     getArtistCoverURL("", "");
//     getTrackFeatures("", "");
//     setSongKey("");
//     setSongMode("");
//     setIsActiveTrack(false);
//   };
//   return {
//   };
// };
