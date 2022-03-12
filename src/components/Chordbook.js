import React, { useState, useEffect, useCallback } from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { orderBy, random, range, update } from "lodash";
import { useAppState } from "./../state/PageWrapper";
import Chord from "./Chord";
import "./chordbook.css";
import { useChordbook } from "./hooks";
import { ChordbookHeader } from "./ChordbookHeader";

export function Chordbook() {
  const { songKeyCenterQuality, songKey, isActiveTrack, getScaleChords } =
    useAppState();
  const {
    createStartingBook,
    createBook,
    chordbooks,
    updateStarterChordbook,
    updateChordbook,
    deleteBook,
    setChordbooks,
    sanitizeIds,
  } = useChordbook();
  const [isLoaded, setIsLoaded] = useState(false);
  const [keyOptionState, setKeyOptionState] = useState(songKey);
  const [modeOptionState, setModeOptionState] = useState(songKeyCenterQuality);

  function handleScaleChange(newKey, newMode, bookId) {
    // console.log(keyOptionState, newKey, newMode);
    const newChords = getScaleChords(newKey, newMode);
    setKeyOptionState(newKey);
    setModeOptionState(newMode);
    updateStarterChordbook(newChords, bookId);
    // sanitizeIds();
    // setChordsList(newChords);
  }
  function handleResetScale(bookId) {
    // console.log(keyOptionState, newKey, newMode);
    const newChords = getScaleChords(songKey, songKeyCenterQuality);
    setKeyOptionState(songKey);
    setModeOptionState(songKeyCenterQuality);
    updateStarterChordbook(newChords, bookId);
    // sanitizeIds();
    // setChordsList(newChords);
  }

  //   function handleCreateBook() {

  //   }

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
    const elements = document.querySelectorAll(
      `.droppableId-${source.droppableId.toString()}`
    );
    // .map((el, i) => (i !== source.index ? el.classList.add('blur') : null))
    for (let i = 0; i < elements.length; i++) {
      // console.log(i, source.index)
      if (i !== source.index - 1) {
        elements[i].classList.add("blur");
      }
    }
    // console.log(elements)
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
    // console.log(destClone);
    // if(destClone)
    // console.log(source, destination, droppableSource, droppableDestination);
    // let removed;
    if (copyChord) {
      const [removed] = sourceClone.splice(droppableSource.index - 1, 1);
      const copy = { ...removed };
      //   console.log("removed!", removed, copy);
      sourceClone.splice(droppableSource.index - 1, 0, removed);
      if (destClone[0].type === "blank") {
        // remove the blank first card
        destClone.splice(0, 1);
      }
      destClone.splice(droppableDestination.index, 0, copy);

      //   console.log("firstCard", firstCard);
      //   console.log("source/dest", sourceClone, destClone);
    } else {
      const [removed] = sourceClone.splice(droppableSource.index - 1, 1);
      console.log("source/dest", sourceClone, destClone);
      destClone.splice(droppableDestination.index, 0, removed);
    }
    // console.log("new removed", removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragUpdate = useCallback(() => {}, []);
  // the only one that is required
  const onDragEnd = useCallback((result) => {
    const { destination, source, droppableId } = result;
    // console.log(destination, source)
    // console.log(chordbooks)
    // detect
    // adding blur animation to non-dragging chords
    const elements = document.querySelectorAll(
      `.chord-detail.droppableId-${source.droppableId}`
    );
    // console.log(elements);
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
      // console.log(reorderedChordbook)
      currentBook.chords = reorderedChordbook;
      // console.log(copyOfCurrentBook)
      chordbooks[currentBookIndex] = currentBook;
      // update the chordbooks state
      // const updatedChordbook = [...chordbooks, copyOfCurrentBook]
      // console.log(chordbooks)
      // console.log(updatedChordbook)
      // setFullChordList(newChords)
      setChordbooks(chordbooks);
    }
    if (destination.droppableId !== source.droppableId) {
      //   console.log(destination, source);
      let copyChord = false;
      // if songs are moved between books and the source book is starter type copy the chord instead of moving it
      if (chordbooks[parseInt(source.droppableId)].type === "starter") {
        copyChord = true;
      }
      console.log(source, destination, chordbooks);
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
    }
  });

  useEffect(() => {
    if (
      songKey !== "" &&
      songKeyCenterQuality !== "" &&
      isActiveTrack &&
      !isLoaded
    ) {
      createStartingBook(songKey, songKeyCenterQuality);
      setIsLoaded(true);
    }
  }, [
    songKey,
    songKeyCenterQuality,
    handleScaleChange,
    chordbooks,
    updateStarterChordbook,
  ]);

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {chordbooks &&
        // chordbooks.map((book, idx) => {
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
                    style={
                      {
                        // backgroundColor: snapshot.isDraggingOver ? 'var(--black)' : '',
                      }
                    }
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
