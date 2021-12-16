import { render } from "@testing-library/react";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

export function Chordbook() {
  // <div>
  const [list, setList] = useState([1, 4, 6, 3]);
  //   <span>Chordbook!</span>
  //   <Draggable draggableId="1" index="1"></Draggable>
  // </div>

  //   function App() {
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
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  return <div></div>;
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
