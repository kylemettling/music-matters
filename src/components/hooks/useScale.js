import { useState, useEffect } from "react";
import { useAppState } from "../../state";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { spotify } from "../config/Connection";
import axios from "axios";

// export const useScale = ({mode="I"}) => {
//   const [isActiveTrack, setIsActiveTrack] = useState(false);
//   const { token, refreshToken, getStoredToken } = useAppState();

//   function getChordFromMode() {

//   }

//   return {
//   };
// };
