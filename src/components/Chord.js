import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ChordImage } from './ChordImage'
import { useState, useRef } from 'react'
import rawNotes from './../state/rawNotes'
import './chord.css'
import { FaTrashAlt } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'

function Chord({
	id,
	position,
	root,
	type,
	degree,
	bookType,
	bookId,
	_droppableId,
	updateChord,
	handleDelete,
	handleCopy,
}) {
	const [isEditing, setToggleIsEditing] = useState(false)
	const [isZoomed, setIsZoomed] = useState(false)
	const [chordRoot, setChordRoot] = useState(root)
	const [chordType, setChordType] = useState(type)
	const [keyOptionState, setKeyOptionState] = useState(root)
	const [typeOptionState, setTypeOptionState] = useState(type)
	const [chordHover, setChordHover] = useState(false)
	const editRef = useRef()
	function handleQuality(type) {
		const newType = type === 'min' ? 'm' : type === 'maj' ? '' : type
		return newType
	}
	function handleName(type, root) {
		const newType = handleQuality(type)
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

	// function handleDelete(e) {
	// 	console.log('delete', id, e)
	// }
	// function handleCopy(e) {
	// 	console.log('copy', id, e)
	// }

	useEffect(() => {
		setChordRoot(root)
		setChordType(type)
		const checkIfEditClickedOutside = (e) => {
			if (editRef.current && !editRef.current.contains(e.target)) {
				setToggleIsEditing(false)
			}
		}
		document.addEventListener('mousedown', checkIfEditClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfEditClickedOutside)
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
					onMouseEnter={() => setChordHover(!chordHover)}
					onMouseLeave={() => setChordHover(!chordHover)}
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
											{rawNotes.map((note, i) => (
												<option
													key={i}
													className='chordRootSelectOption'
													value={note.length > 1 ? note[0] : note}
												>
													{note.length > 1 ? note[0] : note}
												</option>
											))}
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
										{handleName(chordType, chordRoot)}
									</span>
								)}
							</div>
							<ChordImage
								chordName={
									chordType !== 'blank'
										? chordRoot + handleQuality(chordType)
										: 'blank'
								}
							/>{' '}
							<div className='chord-footer flex'>
								<div>
									<FaTrashAlt
										className={`chord-control ${
											chordHover && !['blank', 'starter'].includes(bookType)
												? 'active'
												: ''
										}`}
										style={{ color: 'var(--red)' }}
										onClick={(e) => handleDelete(id, bookId, e)}
									/>
								</div>
								<div>
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
								<div>
									<MdContentCopy
										className={`chord-control ${
											chordHover && !['blank', 'starter'].includes(bookType)
												? 'active'
												: ''
										}`}
										onClick={(e) => handleCopy(id, bookId, e)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default Chord
