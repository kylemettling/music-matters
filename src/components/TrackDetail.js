import axios from "axios";
import "./trackDetail.css";
// import './style.css'
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router";
import { shazam, spotify, pianoChords } from "./config/Connection";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTrack, useTrackFeatures } from "./hooks";
import { useAppState } from "./../state";
import { Chordbook } from "./Chordbook";
import keyTranslation from "../state/keyTranslation";
import Chord from "./Chord";
import { orderBy, random, range } from "lodash";
import { BackButton } from "./BackButton";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export function TrackDetail() {
  const { id } = useParams();
  let query = useQuery();

  const {
    songTitle,
    songArtist,
    songAlbum,
    albumCoverURL,
    artistCover,
    setTrack,
    songKey,
    songKeyCenterQuality,
    spotifySongId,
    getStoredToken,
    token,
    refreshToken,
    isActiveTrack,
    setIsActiveTrack,
    getArtistCoverURL,
    getTrackFeatures,
  } = useAppState();
  async function getTrack(id) {
    if (!token) {
      refreshToken();
    }
    const options = {
      method: "GET",
      url: spotify.urls.getTrack + id,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const fetchTrack = async () => {
      const search = await axios
        .request(options)
        .catch((err) => console.log(err));
      if (!search) {
        refreshToken();
        fetchTrack();
      }
      const trackData = await search?.data;
      return trackData;
    };
    const data = await fetchTrack();
    const url = data?.artists[0]?.href;
    getArtistCoverURL(url, token);
    getTrackFeatures(data?.id, token);
    setTrack(data, token);
    setIsActiveTrack(true);
  }

  useEffect(() => {
    getTrack(id);
  }, [token]);

  if (!songTitle && !songKey) return null;

  return (
    <div className="track">
      <div className="detailCard grid">
        <div className="details ">
          <h1 tabIndex={0} className="trackTitle">
            {songTitle}
          </h1>
          <h2 tabIndex={0} className="trackArtist">
            {songArtist}
          </h2>
          <img
            tabIndex={0}
            className="trackCover"
            src={albumCoverURL}
            alt={songAlbum + " cover"}
          ></img>
          <h3 tabIndex={0} className="trackAlbum">
            {songAlbum}
          </h3>
        </div>

        <img
          tabIndex={0}
          className="artistImage"
          src={artistCover.url}
          alt={songAlbum + " cover"}
        ></img>
      </div>
      <div className="chordbook-container flex">
        <Chordbook />
      </div>
    </div>
  );
}
