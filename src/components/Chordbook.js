import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { render } from "@testing-library/react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { orderBy, random, range } from "lodash";
import Chord from "./Chord";
import data from "../state/chords";
import "./chordbook.css";
export function Chordbook() {
  const [chordList, setChordList] = useState(data);

  const listRenderer = orderBy(chordList, "position").map((item) => (
    <Chord key={item.id} item={item} />
  ));

  function createNewChord() {
    console.log("Create new chord");
    const list = [...chordList];
    const newItem = {
      id: `${list[list.length - 1].id + 1}`,
      keyCenter: "B",
      quality: 0,
      position: list[list.length - 1].position + 1,
    };
    console.log(newItem);
    list.push(<Chord key={newItem.id} item={newItem} />);
    setChordList(list);
  }

  // using useCallback is optional
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    console.log("ok");
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback((result) => {
    // the only one that is required
    const { destination, source } = result;

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
    const reorderedChordbook = chordList.map((chord) => {
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
    setChordList(reorderedChordbook);
    // update the playlist state
  }, []);

  return (
    <div className="chordbook-con">
      <div className="chordbook-main">
        <div className="header">
          <h2>Chordbook!</h2>
        </div>
        <div className="chord-con">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="CHORDBOOK">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {listRenderer}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button className="add-chord" onClick={createNewChord}>
              +
            </button>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
// <DragDropContext
//   onBeforeCapture={onBeforeCapture}
//   onBeforeDragStart={onBeforeDragStart}
//   onDragStart={onDragStart}
//   onDragUpdate={onDragUpdate}
//   onDragEnd={onDragEnd}
// >
// {/* <div>Hello world</div> */}
// {/* <Droppable droppableId="list">
//   {list.map((num, i) => {
//     return (
//       <Draggable key={i} draggableId={i} index={i}>
//         {(provided, snapshot) => <div>{num}</div>}
//       </Draggable>
//     );
//   })}
// </Droppable> */}
// </DragDropContext>
// );
// }
// }
