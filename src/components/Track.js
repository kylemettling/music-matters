import axios from "axios";
import "./track.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { shazam, spotify } from "./config/Connection";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { SpotifyToken } from './SpotifyToken'
// // import { useTrack } from './hooks/useTrack'
// const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export function Track() {
  const { id } = useParams();
  const [track, setTrack] = useState("");
  const [trackFeatures, setTrackFeatures] = useState({});
  const [artistDetails, setArtistDetails] = useState({});
  const [artistImageURL, setArtistImageURL] = useState("");
  const {
    location: {
      state: { token },
    },
  } = useHistory();
  // const [spotifyToken, setSpotifyToken] = useState({})
  //   const [spotifySearchData, setSpotifySearchData] = useState("no data");

  // GET basic track details
  async function getTrack() {
    // console.log("TOKEN:", token, id);
    const options = {
      method: "GET",
      url: spotify.urls.getTrack + id,
      // params: { key: id, locale: "en-US" },
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    };
    const search = await axios.request(options);
    const res = await search.data;
    setTrack(search.data);
    setArtistImageURL(search.data.artists[0].href);
    // try {
    //   const search = await axios.request(options);
    //   setTrack(search.data);
    //   setArtistImageURL(search.data.artists[0].href);
    // } catch (err) {
    //   console.error(err);
    // }
    getTrackFeatures();
  }

  // GET track audio features
  async function getTrackFeatures() {
    // console.log("TOKEN:", token, id);
    const options = {
      method: "GET",
      url: spotify.urls.getTrackFeatures + id,
      // params: { key: id, locale: "en-US" },
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    };
    const search = await axios(options);
    try {
      const search = await axios.request(options);
      // console.log(search.data);
      // const oldData = {...track}
      const featureData = await search.data;
      // const oldData = { ...track };
      // console.log("huh", track);
      setTrackFeatures(featureData);
      // const trackData = { ...(track + search["data"]) };
      // setTrack({ ...oldData, featureData });
      // console.log(featureData);
    } catch (err) {
      console.error(err);
    }

    getArtistDetails();
  }

  async function getArtistDetails() {
    // console.log(track.artists);
    console.log("DETAILS", trackFeatures, artistImageURL, track.astists);
    const options = {
      method: "GET",
      url: artistImageURL,
      // url: track.artists[0].href,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    // const res = await axios(track.artists[0].href, options).catch((err) => {
    //   console.log(err);
    // });
    // const data = await res.data;
    // const data = await res.data;
    // console.log(data);
    // setArtistDetails(data);
    // try {
    //   const search = await axios.request(options);
    //   console.log(search);
    //   const data = await search.data;
    // } catch (err) {
    //   console.log(err);
    // }
    // const artistData = await search.data;
    // console.log(artistData);
  }

  useEffect(() => {
    // getSpotifyToken();

    getTrack();
    // getTrackFeatures();
    // getArtistDetails();
    // console.log(track);
  }, []);

  if (!track.name) return null;

  return (
    <div className="track-main">
      <div className="test">
        {/* <p>{JSON.stringify(track, undefined, 4)}</p> */}
      </div>
      <div className="test">
        <img
          className="album-cover"
          style={{ height: "640px" }}
          src={track.album.images[0]?.url}
        ></img>
        <p>Artist Details: {JSON.stringify(artistDetails)}</p>
      </div>
      {/* <div className="track-card-cover">
        <div
          className="track-card"
          style={{ backgroundImage: `url(${track.album.images.url})` }}
        >
          <div className="track-track-details">
            <h2>
              <div className="track-text-con">
                <span className="track-text bump-text-track">{track.name}</span>
              </div>
            </h2>
            <div className="track-text-con">
              <h3 className="subtitle">
                <span className="track-text track bump-text">
                  {track.subtitle}
                </span>
              </h3>
            </div>
          </div>
          <div className="track-album-details">
            <div className="track-text">
              <img
                className="album-cover"
                src={
                  track.images.coverart
                    ? track.images.coverart
                    : "https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg"
                }
                alt={[track.title] + " cover"}
              ></img>
            </div>
            <div className="album-text-con">
              <h3>
                <span className="">{track.sections[0].metadata[0].text}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>SPOTIFY</h3>
      </div> */}
    </div>
  );
}
