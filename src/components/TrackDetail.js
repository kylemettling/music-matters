import axios from "axios";
import "./track.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { shazam, spotify } from "./config/Connection";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTrack } from "./hooks";
import { useAppState } from "./../state";

export function TrackDetail() {
  const { id } = useParams();
  const [track, setTrack] = useState("");
  const [trackFeatures, setTrackFeatures] = useState({});
  const [artistURL, setArtistURL] = useState("");
  const [artistCover, setArtistCover] = useState("");
  const [songLyrics, setSongLyrics] = useState("");
  const [artistImageDimensions, setImageDimensions] = useState({
    h: null,
    w: null,
  });
  const {
    songTitle,
    songArtist,
    // songLength,
    // songYear,
    songAlbum,
    // artistImage,
    albumCoverURL,
    artistCoverURL,
    getTrackDetails,
    getArtistCoverURL,
  } = useAppState();

  const imageRef = useRef(null);
  const {
    location: {
      state: { token },
    },
  } = useHistory();

  async function getTrack() {
    const options = {
      method: "GET",
      url: spotify.urls.getTrack + id,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const fetchTrack = async () => {
      const search = await axios.request(options);
      const trackData = await search.data;
      const url = trackData.artists[0].href;
      getArtistCoverURL(url, token);
      getTrackDetails(trackData, token);
    };
    fetchTrack();
  }

  // GET track audio features
  async function getTrackFeatures() {
    const options = {
      method: "GET",
      url: spotify.urls.getTrackFeatures + id,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const fetchTrackFeatures = async () => {
      const search = await axios
        .request(options)
        .catch((err) => console.log(err));
      const featureData = await search.data;
      setTrackFeatures(featureData);
    };
    fetchTrackFeatures();
  }

  // GET track lyrics (Shazam only)

  async function getTrackLyrics() {
    // setSongLyrics(trackData)
  }

  useEffect(() => {
    getTrack();
    getTrackFeatures();
    if (artistCoverURL) {
      const height = imageRef.current.offsetHeight;
      const width = imageRef.current.offsetWidth;
      setImageDimensions({ h: height, w: width });
      console.log(artistImageDimensions);
    }
  }, [imageRef]);

  if (!track && !artistURL && !trackFeatures) return null;
  // if (!track ) return null

  return (
    <div>
      <div className="track-main">
        <div className="track-card-cover">
          <div
            className="track-card"
            ref={imageRef}
            style={{
              backgroundImage: `url(${artistCoverURL})`,
            }}
          >
            <div className="track-track-details">
              <div className="track-text-con">
                <h2>
                  <span className="track-text bump-text-track">
                    {songTitle}
                  </span>
                </h2>
              </div>
              <div className="track-text-con">
                <h3 className="subtitle">
                  <span className="track-text track bump-text">
                    {songArtist}
                  </span>
                </h3>
              </div>
            </div>
            <div className="track-album-details">
              <div className="track-text">
                <img
                  className="album-cover"
                  src={albumCoverURL}
                  alt={[songAlbum] + " cover"}
                ></img>
              </div>
              <div className="album-text-con">{songAlbum}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="audio-features">
        {/* <div>{JSON.stringify(trackFeatures, null, 4)}</div> */}
        <span className="track-key">Key: {trackFeatures.key}</span>
        <span className="track-mode">Mode: {trackFeatures.mode}</span>
      </div>
    </div>
  );
}
