import React, { useState, useEffect, useCallback } from 'react'
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'
import { orderBy, random, range, update } from 'lodash'
import { useAppState } from './../state/PageWrapper'
import Chord from './Chord'
import './chordbook.css'
import { useChordbook } from './hooks'

export function Chordbook() {
	const {
		songKeyCenterQuality,
		songKey,
		chordNotes,
		isActiveTrack,
		setIsActiveTrack,
		getScaleChords,
	} = useAppState()
	// const starterScale = {
	// 	id: 1,
	// 	name: 'suggested scale',
	// 	root: songKey,
	// 	mode: songKeyCenterQuality,
	// 	type: 'starter',
	// 	bookId: 1,
	// 	chords: getScaleChords(songKey, songKeyCenterQuality),
	// }
	const { createStartingBook, chordbooks, setChordbooks, sanitizeIds } =
		useChordbook()
	// const [listRenderer, setListRenderer] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [keyOptionState, setKeyOptionState] = useState(songKey)
	const [modeOptionState, setModeOptionState] = useState(songKeyCenterQuality)
	// const [renderer, setRenderer] = useState([])

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

	const CustomHeader = ({ name, type }) => {
		return (
			<div className='chordbookHeader flex card'>
				{type && name && (
					<h5>
						{' '}
						{name}
						<br />
						{type === 'starter' && (
							<span className='suggestedScale'>
								{songKey} {songKeyCenterQuality}
							</span>
						)}
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
		// console.log(elements)
	}, [])

	const move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = [...source]
		const destClone = [...destination]
		console.log(source, destination, droppableSource, droppableDestination)
		const [removed] = sourceClone.splice(droppableSource.index - 1, 1)
		console.log('removed!', removed)
		destClone.splice(droppableDestination.index, 0, removed)
		// console.log(destClone)

		const result = {}
		result[droppableSource.droppableId] = sourceClone
		// console.log(
		// 	'🚀 ~ file: Chordbook.js ~ line 71 ~ move ~ result[droppableSource.droppableId] ',
		// 	result[droppableSource.droppableId]
		// )
		result[droppableDestination.droppableId] = destClone
		// console.log(result)
		// const drop1 = result[0].map((chord, idx) => {
		// 	chord.position = idx + 1
		// 	return chord
		// })
		// const drop2 = result[1].map((chord, idx) => {
		// 	chord.position = idx + 1
		// 	return chord
		// })
		// const res = result.map((chord, idx) => (chord.position = idx))
		// console.log(drop1, drop2)
		// console.log(
		// 	'🚀 ~ file: Chordbook.js ~ line 73 ~ move ~ result[droppableDestination.droppableId]',
		// 	result[droppableDestination.droppableId]
		// )

		// console.log('MOVE RESULT', result)

		return result
	}

	const onDragUpdate = useCallback(() => {}, [])
	// the only one that is required
	const onDragEnd = useCallback((result) => {
		const { destination, source, droppableId } = result
		// console.log(destination, source)
		// console.log(chordbooks)
		// detect
		// adding blur animation to non-dragging chords
		const elements = document.querySelectorAll(
			`.chord-detail.droppableId-${source.droppableId}`
		)
		// console.log(elements);
		for (let i = 0; i < elements.length; i++) {
			elements[i].classList.remove('blur')
		}
		// make sure change occurs
		if (!destination || !source) {
			return
		}
		// access to initial (source) position
		// access to dropped (destination) position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		// checking if the source droppableId is the same as the destination droppableId
		if (destination.droppableId === source.droppableId) {
			// check the direction (> or <)
			const directionOfDrag =
				destination.index > source.index ? 'GREATER' : 'LESS'

			// find the affected range
			let affectedRange
			if (directionOfDrag === 'GREATER') {
				affectedRange = range(source.index, destination.index + 1)
			} else {
				affectedRange = range(destination.index, source.index)
			}
			// console.log('drag result', result)

			// if songs affected (+ or -) update positions
			const currentBookIndex = chordbooks.findIndex((book) =>
				book.id === parseInt(source.droppableId) ? book : null
			)
			const currentBook = chordbooks[currentBookIndex]
			const reorderedChordbook = chordbooks[currentBookIndex].chords.map(
				(chord) => {
					if (chord.id === parseInt(result.draggableId)) {
						chord.position = destination.index
						// console.log('condition 1', chord)
						return chord
					} else if (affectedRange.includes(chord.position)) {
						if (directionOfDrag === 'GREATER') {
							chord.position = chord.position - 1
							// console.log('condition 2.1', chord)
							return chord
						} else if (directionOfDrag === 'LESS') {
							chord.position = chord.position + 1
							// console.log('condition 2.2', chord)
							return chord
						}
					} else {
						// console.log('condition 3', chord)
						return chord
					}
				}
			)
			// console.log(reorderedChordbook)
			currentBook.chords = reorderedChordbook
			// console.log(copyOfCurrentBook)
			chordbooks[currentBookIndex] = currentBook
			// update the chordbooks state
			// const updatedChordbook = [...chordbooks, copyOfCurrentBook]
			// console.log(chordbooks)
			// console.log(updatedChordbook)
			// setFullChordList(newChords)
			setChordbooks(chordbooks)
		}

		if (destination.droppableId !== source.droppableId) {
			console.log(destination, source)
			// console.log('DING DING DING!!! Time to move books!')
			// console.log(
			// 	chordbooks[parseInt(source.droppableId)],
			// 	chordbooks[parseInt(destination.droppableId)],
			// 	chordbooks[parseInt(source.droppableId)].chords,
			// 	chordbooks[parseInt(destination.droppableId)].chords
			// )
			const result = move(
				chordbooks[parseInt(source.droppableId)].chords,
				chordbooks[parseInt(destination.droppableId)].chords,
				source,
				destination
			)
			chordbooks[parseInt(source.droppableId)].chords = result[0]
			chordbooks[parseInt(destination.droppableId)].chords = result[1]
			chordbooks.filter((book) => book.length)
			// console.log(chordbooks)
			sanitizeIds()
			setChordbooks(chordbooks)
			// console.log(result)
		}
		// console.log(
		// 	source.droppableId,
		// 	destination.droppableId,
		// 	source,
		// 	destination
		// )
		// else {
		// 	const result = move(
		// 		source.droppableId,
		// 		destination.droppableId,
		// 		source,
		// 		destination
		// 	)
		// 	setChordsList(result)
		// }
	})

	useEffect(() => {
		if (
			songKey !== '' &&
			songKeyCenterQuality !== '' &&
			isActiveTrack &&
			!isLoaded
		) {
			setKeyOptionState(songKey)
			setModeOptionState(songKeyCenterQuality)
			createStartingBook(songKey, songKeyCenterQuality)
			setIsLoaded(true)
		}
	}, [songKey, songKeyCenterQuality])

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			{chordbooks &&
				chordbooks.map((book, idx) => {
					return (
						<div key={idx} className='chordbook'>
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
												root={chord.root || 'blank'}
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
					)
				})}
		</DragDropContext>
	)
}
