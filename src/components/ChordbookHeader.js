import { useState, useEffect, useRef } from "react";
import { useAppState } from "./../state";

export function ChordbookHeader({
  name,
  type,
  handleScaleChange,
  songKey,
  songMode,
  bookId,
}) {
  const {
    // songMode,
    // songKey,
    chordNotes,
    isActiveTrack,
    setIsActiveTrack,
    getScaleChords,
  } = useAppState();
  const [keySelect, setKeySelect] = useState(songKey);
  const [modeOptionState, setModeOptionState] = useState(songMode);
  const [title, setTitle] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef();

  function handleEditToggle(e) {
    console.log(e);
    if (!isEditing) {
      setIsEditing(!isEditing);
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function doubleClickHighlight(e) {
    e.target.select();
  }

  useEffect(() => {
    const checkIfClickedoutside = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedoutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedoutside);
    };
  }, []);

  //   if (!name && !type) return null;
  // const
  return (
    <div className="chordbookHeader flex card">
      {type && title && (
        <h5 onClick={(e) => handleEditToggle(e)}>
          {isEditing && (
            <input
              onDoubleClick={(e) => doubleClickHighlight(e)}
              ref={editRef}
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          )}
          {!isEditing && title}

          {/* {name} */}
          {type === "starter" && (
            <span className="suggestedScale">
              {songKey} {songMode}
            </span>
          )}
        </h5>
      )}
      {type === "starter" && (
        <div className="keyModeSelect">
          <div>
            <label>Root: </label>
            <select
              name="KeySelector"
              id="key_selector"
              value={keySelect}
              onChange={(e) => setKeySelect(e.target.value)}
            >
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="Db">Db</option>
              <option value="D">D</option>
              <option value="D#">D#</option>
              <option value="Eb">Eb</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="F#">F#</option>
              <option value="Gb">Gb</option>
              <option value="G">G</option>
              <option value="G#">G#</option>
              <option value="Ab">Ab</option>
              <option value="A">A</option>
              <option value="A#">A#</option>
              <option value="Bb">Bb</option>
              <option value="B">B</option>
            </select>
          </div>
          <div>
            <label>Mode: </label>
            <select
              name="ModeSelector"
              id="mode_selector"
              value={modeOptionState}
              onChange={(e) => setModeOptionState(e.target.value)}
            >
              <option value="ionian">Ionian (I) - major</option>
              <option value="dorian">Dorain (II) - minor</option>
              <option value="phrygian">Phrygian (III) - minor</option>
              <option value="lydian">Lydian (IV) - major</option>
              <option value="mixolydian">Mixolydian (V) - major</option>
              <option value="aeolian">Aeolian (VI) - minor</option>
              <option value="locrian">Locrian (VII) - diminished</option>
            </select>
          </div>
          <button
            className="keyModeSubmit"
            onClick={() =>
              handleScaleChange(keySelect, modeOptionState, bookId)
            }
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
