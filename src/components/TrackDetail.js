import axios from "axios";
import "./trackDetail.css";
// import './style.css'
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router";
import { shazam, spotify, pianoChords } from "./config/Connection";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTrack, useTrackFeatures } from "./hooks";
import { useAppState } from "./../state";
import { Chordbook } from "./Chordbook";
import keyTranslation from "../state/keyTranslation";
import Chord from "./Chord";
import { orderBy, random, range } from "lodash";

export function TrackDetail() {
  const { id } = useParams();
  const [songLyrics, setSongLyrics] = useState({ text: "", footer: "" });
  const [rootChords, setRootChords] = useState([]);
  const {
    songTitle,
    songArtist,
    songAlbum,
    albumCoverURL,
    artistURL,
    artistCover,
    setTrack,
    songKey,
    songKeyCenterQuality,
    spotifySongId,
    getStoredToken,
    token,
    refreshToken,
    setTrackFeatures,
    isActiveTrack,
    isStoredTrack,
    setIsActiveTrack,
    clearTrackData,
    getTrackFeatures,
    getArtistCoverURL,
  } = useAppState();

  const [chordPalettes, setChordPalettes] = useState([
    {
      root: keyTranslation[songKey],
      mode: songKeyCenterQuality === 1 ? "mixolydian" : "aeolian",
      type: "starting",
    },
  ]);
  async function getTrack(storedId) {
    // if (!isActiveTrack) {
    // 	getStoredTrack()
    // }

    // console.log('token!', token)
    const options = {
      method: "GET",
      url: spotify.urls.getTrack + (id || storedId),
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    // console.log('get track options', options)
    const fetchTrack = async () => {
      const search = await axios
        .request(options)
        .catch((err) => console.log(err));
      if (!search) {
        refreshToken();
        fetchTrack();
      }
      const trackData = await search.data;
      // if(!search) {
      getTrackFeatures(trackData.id, token);
      getArtistCoverURL(trackData.artists[0].href, token);
      //   refreshToken()
      // }
      return trackData;
    };
    const data = await fetchTrack();
    setTrack(data, token);
    setIsActiveTrack(true);
  }

  // GET track lyrics (Shazam only)
  async function getSongId(title) {
    const options = {
      method: "GET",
      url: shazam.urls.search,
      params: {
        term: title,
        locale: "en-US",
        offset: "0",
        limit: "15  ",
      },
      headers: {
        "x-rapidapi-host": shazam.host,
        "x-rapidapi-key": shazam.key,
      },
    };
    console.log("title: ", title, options);
    // GET request for searching with songTitle to return key
    const search = await axios
      .request(options)
      .then((res) => res?.data?.tracks?.hits)
      .catch((err) => console.log(err));
    // console.log(search)
    if (!search) {
      getSongLyrics(undefined);
    } else {
      const results = [...search];
      const filteredRes = results.filter((song) => {
        return song?.track?.subtitle === songArtist ? song?.track?.key : null;
      });
      console.log("filtered!", filteredRes);

      // getSongLyrics(filteredRes[0]?.track?.key)
    }
    // console.log(search);
  }

  // getSongId()
  // GET request using song key to Shazam for song get-details
  async function getSongLyrics(songId) {
    if (!songId) {
      setSongLyrics({
        text: "No lyrics for this track :(",
        footer: "",
      });
    } else {
      const options = {
        method: "GET",
        url: shazam.urls.trackDetail,
        params: { key: songId, locale: "en-US" },
        headers: {
          "x-rapidapi-host": shazam.host,
          "x-rapidapi-key": shazam.key,
        },
      };
      const lyricSearch = await axios
        .request(options)
        .catch((err) => console.log(err));
      console.log("lyrics", lyricSearch);
      const lyrics = lyricSearch?.data?.sections?.filter(
        (section) => section.type === "LYRICS"
      )[0];
      setSongLyrics({
        text: lyrics?.text,
        footer: lyrics?.footer,
      });
    }
    setSongLyrics({
      text: "Lyrics are paused",
      footer: "",
    });
  }

  const storeTrack = () => {
    localStorage.setItem("songTitle", songTitle);
    localStorage.setItem("songArtist", songArtist);
    localStorage.setItem("songAlbum", songAlbum);
    localStorage.setItem("songKey", songKey);
    localStorage.setItem("songMode", songKeyCenterQuality);
    localStorage.setItem("spotifySongId", spotifySongId);
    localStorage.setItem("albumCoverURL", albumCoverURL);
    localStorage.setItem("artistURL", artistCover.url);
    // console.log('STORAGE!', localStorage)
    // setIsActiveTrack(true)
  };

  const getStoredTrack = () => {
    const path = window.location.pathname.split("/");
    const currentTrackId = path[path.length - 1];
    const storedTrackId = localStorage.getItem("trackId");
    // console.log('Storage inside getStoredTrack', localStorage)
    if (!storedTrackId) {
      getTrack(currentTrackId);
      // getTrackFeatures()
    }
    // console.log(
    // 	'Refreshed track:',
    // 	currentTrackId,
    // 	'Stored track:',
    // 	storedTrackId
    // )
    // storeTrack()
    // const storedArtistId = localStorage.getItem("artistId");
    // if (currentTrackId === storedTrackId) {
    // }

    // if(spotifySongId === history.location.pathname)
  };
  const getChordsFromRoot = async () => {
    const options = {
      method: "GET",
      url: pianoChords.urls.chords + "a",
      headers: {
        "x-rapidapi-host": pianoChords.host,
        "x-rapidapi-key": pianoChords.key,
      },
    };
    // console.log(options)
    const search = await axios
      .request(options)
      .catch((err) => console.log("getRootChord - error", err));
    const data = search.data;
    // console.log(data)
    setRootChords(search);
  };

  function createBlankPalette() {
    console.log("new palette!");
    //  <Chordbook root='F' mode='ionian' type='blank' />
    const blank = {
      key: "",
      root: "",
      type: "",
      id: "",
      position: chordPalettes.length + 1,
    };
    const newPalette = <Chordbook {...blank} />;
    const palettes = [...chordPalettes, newPalette];
    // const listRenderer = orderBy(palettes, 'position').map((palette) => (
    // 	<Chordbook
    // 		key={palette.id}
    // 		root={palette.root}
    // 		type={palette.type}
    // 		id={palette.id}
    // 		position={palette.position}
    // 	/>
    // ))
    setChordPalettes(palettes);
  }

  useEffect(() => {
    if (!token) {
      getStoredToken();
    }
    // if (!songTitle) {
    // 	console.log('getting stored track!!!')
    // 	getStoredTrack()
    // }
    if (songKey) {
      // console.log(keyTranslation, songKey)
    }
    if (!isActiveTrack) {
      getStoredTrack();
    }
    if (isActiveTrack) {
      storeTrack();
    }

    // }
  }, [songTitle, songArtist, isActiveTrack]);

  if (!songTitle && !songKey) return null;
  // if (!track ) return null

  return (
    <div className="track">
      <div className="detailCard grid">
        <div className="details">
          <h1 className="title">
            {/* <a href="#"> */}
            {songTitle}
            {/* </a> */}
          </h1>
          <h2 className="artist">{songArtist}</h2>
          <img
            className="cover"
            src={albumCoverURL}
            alt={[songAlbum] + " cover"}
          ></img>
          <h5 className="album">{songAlbum}</h5>
        </div>

        <img
          className="artistImage"
          style={{
            height: `${
              artistCover.h > 900 ? artistCover.h / 2 : artistCover.h / 1.4
            }px`,
            width: `${artistCover.w / 1.4}px`,
          }}
          src={artistCover.url}
          alt={[songAlbum] + " cover"}
        ></img>
      </div>
      <section className="chordbookContainer">
        {chordPalettes.map((palette, idx) => (
          <Chordbook
            key={idx}
            root={palette.root}
            mode={palette.mode}
            type={palette.type}
          />
        ))}
        <button onClick={createBlankPalette}>+</button>
        <span>Key: {songKey}</span>
        <span>Translated: {keyTranslation[songKey]}</span>
        <span>Mode: {songKeyCenterQuality}</span>
        <span>
          Mode: {songKeyCenterQuality === 1 ? "mixolydian" : "aeolian"}
        </span>
      </section>
    </div>
  );
}
