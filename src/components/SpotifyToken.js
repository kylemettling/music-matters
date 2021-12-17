import axios from "axios";
import { useState, useEffect } from "react";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const getSpotifyToken = async () => {
  // const [token, setToken] = useState('')
  //   let token;
  //   if (!token) {
  const token = localStorage.getItem("spotifyToken") || getNewToken();
  // setToken(storedToken)
  //   console.log(token);
  //   }

  // function getLocalStorageToken() {

  // }

  async function getNewToken() {
    console.log("getting token");
    const options = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    };

    const search = await axios
      .request(options)
      .catch((err) => console.log(err));
    // console.log("Search", search);
    const newToken = await search.data.access_token;
    console.log(newToken);
    localStorage.setItem("spotifyToken", newToken);
    return newToken;
    //   setSpotifyToken(res.data.access_token);
  }
  //   useEffect(() => {
  // 	getLocalStorageToken()
  // 	getSpotifyData()
  // }, [response])
  //   console.log("TOKEN!", token);
  return token;
};
