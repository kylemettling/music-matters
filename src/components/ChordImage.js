import React, { useEffect, useState } from "react";
import { useScript } from "./hooks";

export function ChordImage({ chordName }) {
  console.log("chordName: ", chordName);
  //   const [chord, setChordName] = useState("");
  //   useEffect(() => {
  //     setChordName(chordName);
  //   });

  return (
    <React.Fragment>
      <div className="chord-image-con">
        <ins
          className="scales_chords_api"
          style={{ width: "200px" }}
          chord={chordName}
          //   output="sound"
        ></ins>
      </div>
    </React.Fragment>
  );
}
