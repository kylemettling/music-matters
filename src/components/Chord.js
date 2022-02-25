import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppState } from '../state'
import { useScript } from './hooks/useScript'
import { ChordImage } from './ChordImage'
import { useState, useRef } from 'react'
import './chord.css'

function Chord({ id, position, root, chordType, degree, _droppableId }) {
	const { startingScaleData } = useAppState()
	const [chordImg, setChordImg] = useState(null) //
	const [isEditing, setToggleIsEditing] = useState(false)
	const [chordRoot, setChordRoot] = useState(root)
	const [chordRootType, setChordRootType] = useState(undefined)
	const [keyOptionState, setKeyOptionState] = useState(undefined)
	const [modeOptionState, setModeOptionState] = useState(chordRootType)
	const editRef = useRef()
	// const [newNoteValue, setNewNoteValue] = useState(
	// 	root + handleQuality(chordType)
	// )
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
	function handleEditToggle(e) {
		// e.preventDefault()
		console.log(e.target)

		if (!isEditing) {
			setToggleIsEditing(!isEditing)
		}
	}
	function handleChordChange(e) {
		console.log('handleChordChange', e.target.value, chordRoot)
		// return
		setKeyOptionState(e.target.value)
		setChordRoot(e.target.value)
		setToggleIsEditing(!isEditing)
	}
	// useLayoutEffect(() => {
	// 	effect
	// 	return () => {
	// 		cleanup
	// 	};
	// }, [input])

	useEffect(() => {
		setChordRoot(root)
		const checkIfClickedoutside = (e) => {
			// console.log(e)
			if (editRef.current && !editRef.current.contains(e.target)) {
				setToggleIsEditing(false)
			}
		}
		document.addEventListener('mousedown', checkIfClickedoutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedoutside)
		}
	}, [id, position, chordType, chordRootType, editRef])
	// return null
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
						{/* <a href='#' {...provided.dragHandleProps}> */}
						{/* <a href='#' {...provided.dragHandleProps}>
						Drag Me!
					</a> */}
						<div className={`chord-name-edit`} ref={editRef}>
							<span className='chord-name' onClick={(e) => handleEditToggle(e)}>
								{(isEditing && (
									<div className='key-mode-select-con'>
										<select
											className='chordRootSelect'
											name='KeySelector'
											id='key_selector'
											value={keyOptionState}
											onChange={(e) => handleChordChange(e)}
										>
											<option value='C'>C</option>
											<option value='C#'>C#</option>
											<option value='Db'>Db</option>
											<option value='D'>D</option>
											<option value='D#'>D#</option>
											<option value='Eb'>Eb</option>
											<option value='E'>E</option>
											<option value='F'>F</option>
											<option value='F#'>F#</option>
											<option value='Gb'>Gb</option>
											<option value='G'>G</option>
											<option value='G#'>G#</option>
											<option value='Ab'>Ab</option>
											<option value='A'>A</option>
											<option value='A#'>A#</option>
											<option value='Bb'>Bb</option>
											<option value='B'>B</option>
										</select>
										{/* <select
										name='ModeSelector'
										id='mode_selector'
										value={modeOptionState}
										onChange={(e) => setModeOptionState(e.target.value)}
									>
										<option value='ionian'>Ionian (I) - major</option>
										<option value='dorian'>Dorain (II) - minor</option>
										<option value='phrygian'>Phrygian (III) - minor</option>
										<option value='lydian'>Lydian (IV) - major</option>
										<option value='mixolydian'>Mixolydian (V) - major</option>
										<option value='aeolian'>Aeolian (VI) - minor</option>
										<option value='locrian'>Locrian (VII) - diminished</option>
									</select> */}
										{/* <button
										className='key-mode-submit'
										onClick={(e) => handleScaleChange(e)}
									>
										Get Scale
									</button> */}
									</div>
								)) ||
									// chordRoot ||
									chordRoot + handleQuality(chordType)}
								{/* {} */}
							</span>
							<ChordImage
								chordName={chordRoot + handleQuality(chordType) || 'blank'}
							/>
							{degree && <span>{degree}</span>}
							{/* {image} */}
							{/* <img
							src={`img/${root + handleQuality(chordType)}`}
							alt={`${root + handleQuality(chordType)}`}
						/> */}
						</div>
						{/* </a> */}
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default Chord
