import { useState, useEffect } from "react";
import axios from "axios";

export const useTrack = () => {
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songAlbum, setSongAlbum] = useState("");
  const [albumCoverURL, setAlbumCoverURL] = useState("");
  const [artistCoverURL, setArtistCoverURL] = useState("");

  const getTrackDetails = (data, token) => {
    const setTrackDetails = (data) => {
      const artistName = data.artists[0].name;
      const albumCover = data.album.images[0].url;
      setSongTitle(data.name);
      setSongArtist(artistName);
      setSongAlbum(data.album.name);
      setAlbumCoverURL(albumCover);
    };
    setTrackDetails(data);
  };
  const getArtistCoverURL = (data, token) => {
    const options = {
      method: "GET",
      url: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    // console.log("OPTIONS: ", options);
    const fetchArtistDetails = async () => {
      const search = await axios
        .request(options)
        .catch((err) => console.log(err));
      const artistData = await search.data;
      const artistCover = artistData.images[0].url;
      console.log(artistCover);
      setArtistCoverURL(artistCover);
    };
    fetchArtistDetails();
  };
  return {
    songTitle,
    songArtist,
    songAlbum,
    albumCoverURL,
    artistCoverURL,
    getTrackDetails,
    getArtistCoverURL,
  };
};
