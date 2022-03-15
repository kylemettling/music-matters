import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ChordImage } from './ChordImage'
import { useState, useRef } from 'react'
import rawNotes from './../state/rawNotes'
import './chord.css'

function Chord({
	id,
	position,
	root,
	type,
	degree,
	_droppableId,
	updateChord,
}) {
	const [isEditing, setToggleIsEditing] = useState(false)
	const [chordRoot, setChordRoot] = useState(root)
	const [chordType, setChordType] = useState(type)
	const [keyOptionState, setKeyOptionState] = useState(root)
	const [typeOptionState, setTypeOptionState] = useState(type)
	const editRef = useRef()
	function handleQuality(type) {
		const newType = type === 'min' ? 'm' : type === 'maj' ? '' : type
		return newType
	}
	function handleName(type, root) {
		const newType = handleQuality(type)
		// const newRoot = rawNotes.find((note) => note.name === root).name
		return `${root}${newType === 'blank' ? '' : newType}`
	}
	function handleEditToggle(e) {
		if (!isEditing) {
			setToggleIsEditing(!isEditing)
		}
	}
	function handleChordChange(e) {
		updateChord(_droppableId, id, 'root', e.target.value)
		setKeyOptionState(e.target.value)
		setChordRoot(e.target.value)
		setToggleIsEditing(!isEditing)
	}
	function handleTypeChange(e) {
		updateChord(_droppableId, id, 'type', e.target.value)
		setTypeOptionState(e.target.value)
		setChordType(e.target.value)
		setToggleIsEditing(!isEditing)
	}

	useEffect(() => {
		setChordRoot(root)
		setChordType(type)
		const checkIfClickedoutside = (e) => {
			if (editRef.current && !editRef.current.contains(e.target)) {
				setToggleIsEditing(false)
			}
		}
		document.addEventListener('mousedown', checkIfClickedoutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedoutside)
		}
	}, [id, position, editRef, root, type])
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
							<div
								className='chord-header'
								onClick={(e) => handleEditToggle(e)}
							>
								{(isEditing && (
									<div className='key-mode-select-con'>
										<select
											className='chordRootSelect'
											name='KeySelector'
											id='key_selector'
											value={keyOptionState}
											onChange={(e) => handleChordChange(e)}
										>
											{rawNotes.map((note) => (
												<option
													className='chordRootSelectOption'
													value={
														// note.length > 1 ? `${note[0]}/${note[1]}` : note
														note.length > 1 ? note[0] : note
													}
												>
													{
														// note.length > 1 ? `${note[0]}/${note[1]}` : note
														note.length > 1 ? note[0] : note
													}
												</option>
											))}
											{/* <option value='C'>C</option>
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
											<option value='B'>B</option> */}
										</select>
										<select
											className='chordRootSelect'
											name='KeySelector'
											id='key_selector'
											value={typeOptionState}
											onChange={(e) => handleTypeChange(e)}
										>
											<option className='chordRootSelectOption' value='maj'>
												maj
											</option>
											<option className='chordRootSelectOption' value='maj7'>
												maj7
											</option>
											<option className='chordRootSelectOption' value='min'>
												m
											</option>
											<option className='chordRootSelectOption' value='m7'>
												m7
											</option>
											<option className='chordRootSelectOption' value='7'>
												7
											</option>
											<option className='chordRootSelectOption' value='dim'>
												dim
											</option>
										</select>
									</div>
								)) || (
									<span className='chord-name'>
										{/* {chordRoot + handleQuality(chordType)} */}
										{handleName(chordType, chordRoot)}
									</span>
								)}
							</div>
							<ChordImage
								chordName={
									chordType !== 'blank'
										? chordRoot + handleQuality(chordType)
										: 'blank'

									//   handleName(chordType, chordRoot)
								}
							/>
							{degree && (
								<span
									className={`chord-degree ${
										chordType === 'blank' ? 'blank' : ''
									}`}
								>
									{degree}
								</span>
							)}
						</div>
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default Chord
