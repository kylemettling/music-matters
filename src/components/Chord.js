import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppState } from '../state'

function Chord({ id, position, root, chordType }) {
	const { startingScaleData } = useAppState()

	//
	// console.log('chord', item.id)
	// const setChordQuality = (quality) => {
	// 	quality === 1 ? "minor" :
	// }
	// console.log(item)

	useEffect(() => {
		console.log(id, position, root, chordType)
	}, [id, position, root, chordType])
	// return null
	return (
		<Draggable draggableId={id.toString()} index={position} key={id}>
			{(provided) => (
				<div
					className='chord-detail'
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<a href='#' {...provided.dragHandleProps}>
						Drag Me!
					</a>

					<div>{root + chordType}</div>
					{/* <div>{chordType}</div> */}
				</div>
			)}
		</Draggable>
	)
}

export default Chord
