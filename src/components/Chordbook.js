import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { render } from "@testing-library/react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { orderBy, random, range } from "lodash";
import { useAppState } from "./../state/PageWrapper";
import Chord from "./Chord";
import data from "../state/chords";
import "./chordbook.css";
import scaleNotes from "../state/scaleNotes";
import scaleChordStructure from "../state/scaleChordStructure";
import { ChordImage } from "./ChordImage";
import { useScript } from "./hooks/useScript";
import axios from "axios";
import keyTranslation from "../state/keyTranslation";

export function Chordbook({ type, name, bookId, chords }) {
  const [chordsList, setChordsList] = useState([]);
  const {
    songKeyCenterQuality,
    songKey,
    chordNotes,
    isActiveTrack,
    getScaleChords,
  } = useAppState();
  // const [listRenderer, setListRenderer] = useState([])
  const [keyOptionState, setKeyOptionState] = useState(songKey);
  const [modeOptionState, setModeOptionState] = useState(songKeyCenterQuality);
  // const [renderer, setRenderer] = useState([])

  const listRenderer = orderBy(chordsList, "position").map((chord) => (
    <Chord
      key={chord.id}
      root={chord.root}
      chordType={chord.type}
      id={chord.id}
      position={chord.position}
      degree={chord.degree}
    />
  ));

  function createSuggestedChords() {
    const chords = getScaleChords(songKey, songKeyCenterQuality);
    setKeyOptionState(songKey);
    setModeOptionState(songKeyCenterQuality);
    setChordsList(chords);
  }

  function createBlankChords() {
    const chords = [
      { id: 1, key: "", root: "", type: "blank", position: 1 },
      { id: 2, key: "", root: "", type: "blank", position: 3 },
      { id: 3, key: "", root: "", type: "blank", position: 4 },
      { id: 4, key: "", root: "C", type: "min", position: 2 },
    ];
    console.log(chords);
    setChordsList(chords);
  }

  function handleScaleChange(e) {
    console.log(keyOptionState, modeOptionState, e.target.value);
    const newChords = getScaleChords(keyOptionState, modeOptionState);
    console.log("NEW CHORDS", newChords);
    setKeyOptionState(keyOptionState);
    setModeOptionState(modeOptionState);
    setChordsList(newChords);
    // setRenderer(chordsList)
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(source.index, 1);
    destClone.splice(destination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    // console.log(
    // 	'🚀 ~ file: Chordbook.js ~ line 71 ~ move ~ result[droppableSource.droppableId] ',
    // 	result[droppableSource.droppableId]
    // )
    result[droppableDestination.droppableId] = destClone;
    // console.log(
    // 	'🚀 ~ file: Chordbook.js ~ line 73 ~ move ~ result[droppableDestination.droppableId]',
    // 	result[droppableDestination.droppableId]
    // )

    // console.log('MOVE RESULT', result)

    return result;
  };

  // using useCallback is optional
  const onBeforeCapture = useCallback(() => {
    // console.log('ok')
  }, []);
  const onBeforeDragStart = useCallback(() => {
    // console.log('ok')
  }, []);
  const onDragStart = useCallback((result) => {
    // add blur animation to non-dragging chords
    const { destination, source } = result;
    const elements = document.querySelectorAll(".chord-detail");
    // .map((el, i) => (i !== source.index ? el.classList.add('blur') : null))
    for (let i = 0; i < elements.length; i++) {
      console.log(i, source.index);
      if (i !== source.index - 1) {
        elements[i].classList.add("blur");
      }
    }
  }, []);
  const onDragUpdate = useCallback(() => {}, []);
  // the only one that is required
  const onDragEnd = useCallback((result) => {
    const { destination, source } = result;

    // adding blur animation to non-dragging chords
    const elements = document.querySelectorAll(".chord-detail");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("blur");
    }
    // make sure change occurs
    if (!destination || !source) {
      return;
    }
    // access to initial (source) position
    // access to dropped (destination) position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // checking if the source droppableId is the same as the destination droppableId
    if (destination.droppableId === source.droppableId) {
      // check the direction (> or <)
      const directionOfDrag =
        destination.index > source.index ? "GREATER" : "LESS";

      // find the affected range
      let affectedRange;
      if (directionOfDrag === "GREATER") {
        affectedRange = range(source.index, destination.index + 1);
      } else {
        affectedRange = range(destination.index, source.index);
      }
      // console.log('drag result', result)

      // if songs affected (+ or -) update positions
      const reorderedChordbook = chordsList.map((chord) => {
        if (chord.id === parseInt(result.draggableId)) {
          chord.position = destination.index;
          // console.log('condition 1', chord)
          return chord;
        } else if (affectedRange.includes(chord.position)) {
          if (directionOfDrag === "GREATER") {
            chord.position = chord.position - 1;
            // console.log('condition 2.1', chord)
            return chord;
          } else if (directionOfDrag === "LESS") {
            chord.position = chord.position + 1;
            // console.log('condition 2.2', chord)
            return chord;
          }
        } else {
          // console.log('condition 3', chord)
          return chord;
        }
      });
      // console.log(reorderedChordbook)
      // update the playlist state
      setChordsList(reorderedChordbook);
    }
    console.log(
      source.droppableId,
      destination.droppableId,
      source,
      destination
    );
    // else {
    // 	const result = move(
    // 		source.droppableId,
    // 		destination.droppableId,
    // 		source,
    // 		destination
    // 	)
    // 	setChordsList(result)
    // }
  });

  useEffect(() => {
    if (isActiveTrack && songKey !== "" && songKeyCenterQuality !== "") {
      if (type !== "blank") {
        createSuggestedChords();
      } else {
        createBlankChords();
      }
    }
  }, [songKey, songKeyCenterQuality]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId={bookId.toString()} direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="chords"
            >
              {orderBy(chordsList, "position").map((chord) => (
                <Chord
                  key={chord.id}
                  root={chord.root}
                  chordType={chord.type}
                  id={chord.id}
                  position={chord.position}
                  degree={chord.degree}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
