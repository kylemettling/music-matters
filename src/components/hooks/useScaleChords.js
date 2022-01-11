import { useState, useEffect } from "react";
import { useAppState } from "../../state";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { spotify } from "../config/Connection";
import axios from "axios";
import scaleNotes from "./../../state/scaleNotes";
import scaleChordStructure from "../../state/scaleChordStructure";

export const useScaleChords = () => {
  function getScaleChords(root, mode) {
    //   function getScaleChords(root, scales, chordStructure, mode) {
    const notes = scaleNotes[root]?.notes;
    console.log(notes);
    const structure = scaleChordStructure[mode];
    console.log(scaleChordStructure);
    // const scaleChords = scaleNotes.map((note, idx) => [
    // 	{
    // 		id: idx + 1,
    // 		root: note,
    // 		type: scaleChordStructure[idx],
    // 		position: idx + 1,
    // 	},
    // ])
    const scaleChords = notes.map((note, idx) => {
      return {
        id: idx + 1,
        root: note,
        type: structure[idx],
        position: idx + 1,
      };
    });
    console.log("Scale Chords created", scaleChords);
    return scaleChords;
  }

  return {
    getScaleChords,
  };
};
