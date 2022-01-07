import { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppState } from "../state";

function Chord({ item }) {
  const { startingScaleData } = useAppState();

  // console.log('chord', item.id)
  // const setChordQuality = (quality) => {
  // 	quality === 1 ? "minor" :
  // }
  console.log(item);

  useEffect(() => {}, [item]);

  return (
    <Draggable
      draggableId={item.id.toString()}
      index={item.position}
      key={item.id}
    >
      {(provided) => (
        <div
          className="chord-detail"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <a href="#" {...provided.dragHandleProps}>
            Drag Me!
          </a>
          <span className="title">
            {item.keyCenter}-{item.quality === 1 ? "minor" : "major"}
          </span>

          <div>{JSON.stringify(startingScaleData)}</div>
        </div>
      )}
    </Draggable>
  );
}

export default Chord;
