import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppState } from '../state'
import { useScript } from './hooks/useScript'
import { ChordImage } from './ChordImage'

function Chord({ id, position, root, chordType }) {
	const { startingScaleData } = useAppState()

	//
	// console.log('chord', item.id)
	// const setChordQuality = (quality) => {
	// 	quality === 1 ? "minor" :
	// }
	// console.log(item)

	// useScript('https://www.scales-chords.com/api/scales-chords-api.js')
	function handleQuality() {
		const newType =
			chordType === 'min' ? 'm' : chordType === 'maj' ? '' : chordType
		return newType
	}

	useEffect(() => {
		// console.log(id, position, root, chordType)
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
					<div {...provided.dragHandleProps}>
						{/* <a href='#' {...provided.dragHandleProps}> */}
						{/* <a href='#' {...provided.dragHandleProps}>
						Drag Me!
					</a> */}
						<ChordImage chordName={root + handleQuality(chordType)} />
						<span>{root + chordType}</span>
					</div>
					{/* </a> */}
				</div>
			)}
		</Draggable>
	)
}

export default Chord
