import React, { useState, useEffect, useCallback } from 'react'
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'
import { orderBy, random, range } from 'lodash'
import { useAppState } from './../state/PageWrapper'
import Chord from './Chord'
import './chordbook.css'
import { useChordbook } from './hooks'

export function Chordbook() {
	// export function Chordbook({ type, name, bookId, chords }) {
	// const [chordsList, setChordsList] = useState([])
	const {
		songKeyCenterQuality,
		songKey,
		chordNotes,
		isActiveTrack,
		setIsActiveTrack,
		getScaleChords,
		// fullChordList,
		// setFullChordList,
	} = useAppState()
	// const [chordbooks, setChordbooks] = useState([

	// ])
	// const starterScale = {
	// 	id: 1,
	// 	name: 'suggested scale',
	// 	root: songKey,
	// 	mode: songKeyCenterQuality,
	// 	type: 'starter',
	// 	bookId: 1,
	// 	chords: getScaleChords(songKey, songKeyCenterQuality),
	// }
	const { chordbooks, createStartingBook } = useChordbook()
	// const [listRenderer, setListRenderer] = useState([])
	const [keyOptionState, setKeyOptionState] = useState(songKey)
	const [modeOptionState, setModeOptionState] = useState(songKeyCenterQuality)
	// const [renderer, setRenderer] = useState([])

	// const listRenderer = orderBy(chordsList, 'position').map((chord) => (
	// 	<Chord
	// 		key={chord.id}
	// 		root={chord.root}
	// 		chordType={chord.type}
	// 		id={chord.id}
	// 		position={chord.position}
	// 		degree={chord.degree}
	// 	/>
	// ))

	// function createSuggestedChords() {
	// 	const chords = getScaleChords(songKey, songKeyCenterQuality)
	// 	const listCopy = [...fullChordList]

	// 	setKeyOptionState(songKey)
	// 	setModeOptionState(songKeyCenterQuality)
	// 	setChordbooks(chords)
	// }

	// function createBlankChords() {
	// 	const chords = [
	// 		{ id: 1, key: '', root: '', type: 'blank', position: 1 },
	// 		{ id: 2, key: '', root: '', type: 'blank', position: 3 },
	// 		{ id: 3, key: '', root: '', type: 'blank', position: 4 },
	// 		{ id: 4, key: '', root: 'C', type: 'min', position: 2 },
	// 	]
	// 	console.log(chords)
	// 	setChordsList(chords)
	// }

	// function handleScaleChange(e) {
	// 	console.log(keyOptionState, modeOptionState, e.target.value)
	// 	const newChords = getScaleChords(keyOptionState, modeOptionState)
	// 	console.log('NEW CHORDS', newChords)
	// 	setKeyOptionState(keyOptionState)
	// 	setModeOptionState(modeOptionState)
	// 	setChordsList(newChords)
	// }

	const move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source)
		const destClone = Array.from(destination)
		const [removed] = sourceClone.splice(source.index, 1)
		destClone.splice(destination.index, 0, removed)

		const result = {}
		result[droppableSource.droppableId] = sourceClone
		// console.log(
		// 	'🚀 ~ file: Chordbook.js ~ line 71 ~ move ~ result[droppableSource.droppableId] ',
		// 	result[droppableSource.droppableId]
		// )
		result[droppableDestination.droppableId] = destClone
		// console.log(
		// 	'🚀 ~ file: Chordbook.js ~ line 73 ~ move ~ result[droppableDestination.droppableId]',
		// 	result[droppableDestination.droppableId]
		// )

		// console.log('MOVE RESULT', result)

		return result
	}
	const CustomHeader = ({ name, type }) => {
		return (
			<div className='chordbookHeader flex card'>
				{type && name && (
					<h5>
						{' '}
						{name}
						<br />
						<span className='suggestedScale'>
							{songKey} {songKeyCenterQuality}
						</span>
					</h5>
				)}
				{type === 'starter' && (
					<div className='keyModeSelect'>
						<div>
							<label>Root: </label>
							<select
								name='KeySelector'
								id='key_selector'
								value={keyOptionState}
								onChange={(e) => setKeyOptionState(e.target.value)}
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
						</div>
						<div>
							<label>Mode: </label>
							<select
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
							</select>
						</div>
						<button
							className='keyModeSubmit'
							onClick={(e) => handleScaleChange(e)}
						>
							Change
						</button>
					</div>
				)}
			</div>
		)
	}

	// using useCallback is optional
	const onBeforeCapture = useCallback(() => {
		// console.log('ok')
	}, [])
	const onBeforeDragStart = useCallback(() => {
		// console.log('ok')
	}, [])
	const onDragStart = useCallback((result) => {
		// add blur animation to non-dragging chords
		const { destination, source } = result
		const elements = document.querySelectorAll(
			`.droppableId-${source.droppableId.toString()}`
		)
		// .map((el, i) => (i !== source.index ? el.classList.add('blur') : null))
		for (let i = 0; i < elements.length; i++) {
			// console.log(i, source.index)
			if (i !== source.index - 1) {
				elements[i].classList.add('blur')
			}
		}
	}, [])
	const onDragUpdate = useCallback(() => {}, [])
	// the only one that is required
	// const onDragEnd = useCallback((result) => {
	// 	const { destination, source, droppableId } = result
	// 	console.log(destination, source)
	// 	const copyOfChordsList = [...fullChordList]
	// 	// detect
	// 	// adding blur animation to non-dragging chords
	// 	const elements = document.querySelectorAll(
	// 		`.chord-detail.droppableId-${source.droppableId}`
	// 	)
	// 	for (let i = 0; i < elements.length; i++) {
	// 		elements[i].classList.remove('blur')
	// 	}
	// 	// make sure change occurs
	// 	if (!destination || !source) {
	// 		return
	// 	}
	// 	// access to initial (source) position
	// 	// access to dropped (destination) position
	// 	if (
	// 		destination.droppableId === source.droppableId &&
	// 		destination.index === source.index
	// 	) {
	// 		return
	// 	} else if (destination.droppableId !== source.droppableId) {
	// 		console.log(destination, source)
	// 	}

	// 	// checking if the source droppableId is the same as the destination droppableId
	// 	if (destination.droppableId === source.droppableId) {
	// 		// check the direction (> or <)
	// 		const directionOfDrag =
	// 			destination.index > source.index ? 'GREATER' : 'LESS'

	// 		// find the affected range
	// 		let affectedRange
	// 		if (directionOfDrag === 'GREATER') {
	// 			affectedRange = range(source.index, destination.index + 1)
	// 		} else {
	// 			affectedRange = range(destination.index, source.index)
	// 		}
	// 		// console.log('drag result', result)

	// 		// if songs affected (+ or -) update positions
	// 		const reorderedChordbook = fullChordList[`${source.index}`].map(
	// 			(chord) => {
	// 				if (chord.id === parseInt(result.draggableId)) {
	// 					chord.position = destination.index
	// 					// console.log('condition 1', chord)
	// 					return chord
	// 				} else if (affectedRange.includes(chord.position)) {
	// 					if (directionOfDrag === 'GREATER') {
	// 						chord.position = chord.position - 1
	// 						// console.log('condition 2.1', chord)
	// 						return chord
	// 					} else if (directionOfDrag === 'LESS') {
	// 						chord.position = chord.position + 1
	// 						// console.log('condition 2.2', chord)
	// 						return chord
	// 					}
	// 				} else {
	// 					// console.log('condition 3', chord)
	// 					return chord
	// 				}
	// 			}
	// 		)
	// 		// console.log(reorderedChordbook)
	// 		// update the playlist state
	// 		// const newChords = [...fullChordList, reorderedChordbook]
	// 		// setFullChordList(newChords)
	// 		setChordsList(reorderedChordbook)
	// 	}
	// 	console.log(
	// 		source.droppableId,
	// 		destination.droppableId,
	// 		source,
	// 		destination
	// 	)
	// 	// else {
	// 	// 	const result = move(
	// 	// 		source.droppableId,
	// 	// 		destination.droppableId,
	// 	// 		source,
	// 	// 		destination
	// 	// 	)
	// 	// 	setChordsList(result)
	// 	// }
	// })

	useEffect(() => {
		if (songKey && songKeyCenterQuality && isActiveTrack) {
			setKeyOptionState(songKey)
			setModeOptionState(songKeyCenterQuality)
			createStartingBook(songKey, songKeyCenterQuality)
			console.log(songKey, songKeyCenterQuality)
		}
	}, [songKey, songKeyCenterQuality])

	return (
		<>
			<DragDropContext
			// onDragEnd={onDragEnd}
			>
				{chordbooks.map((book, idx) => {
					console.log(book)
					return (
						<>
							{/* // <div className='chordbook'>
							// 	<Chordbook
							// 		key={idx}
							// 		type={book.type}
							// 		name={book.name}
							// 		bookId={book.bookId}
							// 	/>
							// </div> */}
							<div className='chordbook'>
								<CustomHeader name={book.name} type={book.type} />
								<Droppable
									droppableId={book.id.toString()}
									direction='horizontal'
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
											className='chords'
										>
											{orderBy(book.chords, 'position').map((chord) => (
												<Chord
													key={chord.id}
													_droppableId={book.id.toString()}
													root={chord.root}
													chordType={chord.type}
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
						</>
					)
				})}
			</DragDropContext>
		</>
	)
}
