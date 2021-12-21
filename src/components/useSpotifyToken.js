import axios from "axios";
import { useState, useEffect } from "react";

export const useSpotifyToken = async () => {
  const [token, setToken] = useState(undefined);
  const [isActiveToken, setIsActiveToken] = useState(false);
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  // const [isActiveToken, setIsActiveToken] = useState(false);
  // let token;
  // getNewToken();
  //   if (!token) {
  // const token = localStorage.getItem("spotifyToken") || getNewToken();
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
    const newToken = await search.data.access_token;
    console.log("New token: ", newToken);
    localStorage.setItem("spotifyToken", newToken);
    // setIsActiveToken(true);
    setToken(newToken);
    // return newToken;
  }

  const tokenToggle = () => {
    setIsActiveToken(!tokenToggle);
  };

  useEffect(() => {
    if (!isActiveToken) {
      getNewToken();
    }
    // getLocalStorageToken()
    // getSpotifyData()
  }, []);
  return [token, { getNewToken, tokenToggle }];
};
