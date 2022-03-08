import { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppState } from "../state";
import { useClickOffTarget } from "./hooks/";
import { ChordImage } from "./ChordImage";
import { useState, useRef } from "react";
import "./chord.css";

function Chord({ id, position, root, type, degree, _droppableId }) {
  const [isEditing, setToggleIsEditing] = useState(false);
  const [chordRoot, setChordRoot] = useState(root);
  const [chordType, setChordType] = useState(type);
  const [keyOptionState, setKeyOptionState] = useState(root);
  const [typeOptionState, setTypeOptionState] = useState(type);
  const editRef = useRef();
  function handleQuality(type) {
    const newType = type === "min" ? "m" : type === "maj" ? "" : type;
    return newType;
  }
  function handleEditToggle(e) {
    console.log(e.target);

    if (!isEditing) {
      setToggleIsEditing(!isEditing);
    }
  }
  function handleChordChange(e) {
    // console.log("handleChordChange", e.target.value, chordRoot);
    setKeyOptionState(e.target.value);
    setChordRoot(e.target.value);
    setToggleIsEditing(!isEditing);
  }
  function handleTypeChange(e) {
    // console.log("handleTypeChange", e.target.value, chordType);
    setTypeOptionState(e.target.value);
    setChordType(e.target.value);
    setToggleIsEditing(!isEditing);
  }

  useEffect(() => {
    setChordRoot(root);
    setChordType(type);
    const checkIfClickedoutside = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        setToggleIsEditing(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedoutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedoutside);
    };
  }, [id, position, chordType, editRef, root]);
  return (
    <Draggable draggableId={id.toString()} index={position} key={id}>
      {(provided) => (
        <div
          className={`chord-detail droppableId-${_droppableId} flex card`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <div className={`chord-name-edit`} ref={editRef}>
              <span
                className="chord-header"
                onClick={(e) => handleEditToggle(e)}
              >
                {(isEditing && (
                  <div className="key-mode-select-con">
                    <select
                      className="chordRootSelect"
                      name="KeySelector"
                      id="key_selector"
                      value={keyOptionState}
                      onChange={(e) => handleChordChange(e)}
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
                    <select
                      className="chordRootSelect"
                      name="KeySelector"
                      id="key_selector"
                      value={typeOptionState}
                      onChange={(e) => handleTypeChange(e)}
                    >
                      <option value="maj">maj</option>
                      <option value="maj7">maj7</option>
                      <option value="min">min</option>
                      <option value="min7">min7</option>
                      <option value="7">7</option>
                      <option value="dim">dim</option>
                    </select>
                  </div>
                )) || (
                  <span className="chord-name">
                    {chordRoot + handleQuality(chordType)}
                  </span>
                )}
              </span>
              <ChordImage
                chordName={
                  chordType !== "blank"
                    ? chordRoot + handleQuality(chordType)
                    : "blank"
                }
              />
              {degree && <span>{degree}</span>}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Chord;
