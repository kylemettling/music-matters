import React, { useState, useEffect, useCallback } from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { orderBy, random, range, update } from "lodash";
import { useAppState } from "./../state/PageWrapper";
import Chord from "./Chord";
import "./chordbook.css";
import { useChordbook } from "./hooks";
import { ChordbookHeader } from "./ChordbookHeader";
import { useParams } from "react-router-dom";

export function Chordbook() {
  const { songKeyCenterQuality, songKey, isActiveTrack, getScaleChords } =
    useAppState();
  const {
    createStartingBook,
    createBook,
    chordbooks,
    updateStarterChordbook,
    updateChordbook,
    updateChord,
    deleteBook,
    setChordbooks,
    sanitizeIds,
    storeChordbooks,
    loadChordbooks,
  } = useChordbook();
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStorageChecked, setIsStorageChecked] = useState(false);
  const [keyOptionState, setKeyOptionState] = useState(songKey);
  const [modeOptionState, setModeOptionState] = useState(songKeyCenterQuality);
  const [loadedBooks, setLoadedBooks] = useState(() => {
    const stored = localStorage.getItem(id);
    const initial = JSON.parse(stored);
    return initial || "";
  });
  // const loadedBooks = localStorage.getItem(id)
  // 	? JSON.parse(localStorage.getItem(id))
  // 	: { loadedBooks: [] }

  //   loadChordbooks(id);
  //   const loadedBooks = JSON.parse(localStorage.getItem(id));
  function handleScaleChange(newKey, newMode, bookId) {
    const newChords = getScaleChords(newKey, newMode);
    setKeyOptionState(newKey);
    setModeOptionState(newMode);
    updateStarterChordbook(newChords, bookId);
  }
  function handleResetScale(bookId) {
    const newChords = getScaleChords(songKey, songKeyCenterQuality);
    setKeyOptionState(songKey);
    setModeOptionState(songKeyCenterQuality);
    updateStarterChordbook(newChords, bookId);
  }
  const onDragStart = useCallback((result) => {
    // add blur animation to non-dragging chords
    const { destination, source } = result;
    const elements = document.querySelectorAll(
      `.droppableId-${source.droppableId.toString()}`
    );
    for (let i = 0; i < elements.length; i++) {
      if (i !== source.index - 1) {
        elements[i].classList.add("blur");
      }
    }
  }, []);

  const move = (
    source,
    destination,
    droppableSource,
    droppableDestination,
    copyChord
  ) => {
    const sourceClone = [...source];
    const destClone = [...destination];
    if (copyChord) {
      const [removed] = sourceClone.splice(droppableSource.index - 1, 1);
      const copy = { ...removed };
      sourceClone.splice(droppableSource.index - 1, 0, removed);
      if (!destClone[0]) {
        // if destination chord list is empty push copy to it
        destClone.push(copy);
        console.log("empty chords", destClone);
      } else if (destClone[0].type === "blank") {
        // if destination chord list is not empty and first chord is blank splice copy into it and remove blank
        // remove the blank first card
        console.log("blank removal");
        destClone.splice(0, 1);
        destClone.splice(droppableDestination.index - 1, 0, copy);
      } else {
        // if destination chord list is not empty and first chord is not blank splice copy into it
        destClone.splice(droppableDestination.index - 1, 0, copy);
      }
    } else {
      // if not copying chord just move it
      console.log("source/dest", sourceClone, destClone);
      const [removed] = sourceClone.splice(droppableSource.index - 1, 1);
      destClone.splice(droppableDestination.index - 1, 0, removed);
    }
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragUpdate = useCallback(() => {}, []);
  // the only one that is required
  const onDragEnd = useCallback((result) => {
    const { destination, source, droppableId } = result;
    // adding blur animation to non-dragging chords
    const elements = document.querySelectorAll(
      `.chord-detail.droppableId-${source.droppableId}`
    );
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

      // if songs affected (+ or -) update positions
      const currentBookIndex = chordbooks.findIndex((book) =>
        book.id === parseInt(source.droppableId) ? book : null
      );
      const currentBook = chordbooks[currentBookIndex];
      const reorderedChordbook = chordbooks[currentBookIndex].chords.map(
        (chord) => {
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
        }
      );
      currentBook.chords = reorderedChordbook;
      chordbooks[currentBookIndex] = currentBook;
      setChordbooks(chordbooks);
    }
    if (destination.droppableId !== source.droppableId) {
      let copyChord = false;
      // if songs are moved between books and the source book is starter type copy the chord instead of moving it
      if (chordbooks[parseInt(source.droppableId)].type === "starter") {
        copyChord = true;
      }
      const result = move(
        chordbooks[parseInt(source.droppableId)].chords,
        chordbooks[parseInt(destination.droppableId)].chords,
        source,
        destination,
        copyChord
      );
      chordbooks[parseInt(source.droppableId)].chords =
        result[source.droppableId];
      chordbooks[parseInt(destination.droppableId)].chords =
        result[destination.droppableId];
      chordbooks.filter((book) => book.length);
      setChordbooks(chordbooks);
      sanitizeIds();
      storeChordbooks(id);
    }
  });

  useEffect(() => {
    if (
      songKey !== "" &&
      songKeyCenterQuality !== "" &&
      isActiveTrack &&
      !isLoaded
    ) {
      if (loadedBooks.length === 0) {
        createStartingBook(songKey, songKeyCenterQuality, id);
        storeChordbooks(id);
        setIsLoaded(true);
      } else {
        setChordbooks(loadedBooks);
        storeChordbooks(id);
        setIsLoaded(true);
      }
    }
    return storeChordbooks(id);
  }, [songKey, songKeyCenterQuality, chordbooks, id, loadedBooks]);

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {chordbooks &&
        orderBy(chordbooks, "id").map((book, idx) => {
          return (
            <div key={idx} className="chordbook">
              <ChordbookHeader
                handleScaleChange={handleScaleChange}
                handleResetScale={handleResetScale}
                handleCreateBook={createBook}
                handleUpdateBook={updateChordbook}
                handleDeleteBook={deleteBook}
                includeControls={
                  chordbooks.length === idx + 1 || book.isErasable
                    ? true
                    : false
                }
                isErasable={book.isErasable}
                bookId={book.id}
                songKey={songKey}
                songMode={songKeyCenterQuality}
                name={book.name}
                type={book.type}
              />
              <Droppable
                droppableId={book.id.toString()}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="chords"
                  >
                    {orderBy(book.chords, "position").map((chord) => (
                      <Chord
                        key={chord.id}
                        _droppableId={book.id.toString()}
                        root={chord.root || "blank"}
                        type={chord.type}
                        id={chord.id}
                        position={chord.position}
                        degree={chord.degree}
                        updateChord={updateChord}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
    </DragDropContext>
  );
}
