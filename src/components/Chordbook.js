import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import { render } from '@testing-library/react'
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'
import { orderBy, random, range } from 'lodash'
import { useAppState } from './../state/PageWrapper'
import Chord from './Chord'
import data from '../state/chords'
import './chordbook.css'
import scaleNotes from '../state/scaleNotes'
import scaleChordStructure from '../state/scaleChordStructure'
import { ChordImage } from './ChordImage'
import { useScript } from './hooks/useScript'
import axios from 'axios'

export function Chordbook({ root = 'C', mode = 'ionian' }) {
	const [chordList, setChordList] = useState([])
	const [keyOptionState, setKeyOptionState] = useState('C')
	const [modeOptionState, setModeOptionState] = useState('ionian')

	const { songKeyCenterQuality, chordNotes, getScaleChords } = useAppState()

	function handleQuality(chordType) {
		const newType =
			chordType === 'min' ? 'm' : chordType === 'maj' ? '' : chordType
		return newType
	}
	useScript('https://www.scales-chords.com/api/scales-chords-api.js')

	const listRenderer = orderBy(chordList, 'position').map((chord) => (
		<Chord
			key={chord.id}
			root={chord.root}
			chordType={chord.type}
			id={chord.id}
			position={chord.position}
			// image={<ChordImage chordName={chord.root + handleQuality(chord.type)} />}
		/>
	))
	// const listRenderer = orderBy(chordList, 'position').map((chord) => (
	// 	<Chord key={chord.id} chord={chord} />
	// ))

	// function createScaleChords() {
	// 	console.log('generating scale chords', songKeyCenterQuality)
	// }

	function createSuggestedChords(requestKey = root, requestMode = mode) {
		const chords = getScaleChords(requestKey, requestMode)
		console.log(chords)
		// console.log('new scale chords', chords)
		// const newList = chords.map((chord) => (
		// 	<Chord key={chord.id} chord={{ ...chord }} />
		// ))
		// for (const chord of chords) {
		// 	console.log(chord.id)
		// 	newList.unshift(<Chord key={chord.id} chord={chord} />)
		// }
		// console.log(newList)
		// console.log(chords)
		// console.log(chords)
		setChordList(chords)
		// return chordList
		// const list = [...chordList]
		// const newItem = {
		// 	id: `${list[list.length - 1].id + 1}`,
		// 	keyCenter: 'B',
		// 	quality: 0,
		// 	position: list[list.length - 1].position + 1,
		// }
		// list.push(<Chord key={newItem.id} item={newItem} />)
	}

	// async function getImage() {
	// 	const search = await axios.post(
	// 		'https://www.scales-chords.com/api/scapi.1.3.php',
	// 		{
	// 			id: `scapiobjid1`,
	// 			class: 'scales_chords_api',
	// 			chord: 'Em',
	// 			id: `scapiobjid1`,
	// 			style: 'width: 50px',
	// 		},
	// 	)
	// 	console.log(search)
	// }

	function handleScaleChange(e) {
		const newChords = getScaleChords(keyOptionState, modeOptionState)
		console.log(newChords)
		setChordList(newChords)
	}

	// using useCallback is optional
	const onBeforeCapture = useCallback(() => {
		/*...*/
	}, [])
	const onBeforeDragStart = useCallback(() => {
		/*...*/
	}, [])
	const onDragStart = useCallback(() => {
		console.log('ok')
		/*...*/
	}, [])
	const onDragUpdate = useCallback(() => {
		/*...*/
	}, [])
	const onDragEnd = useCallback(
		(result) => {
			// the only one that is required
			const { destination, source } = result

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
			const reorderedChordbook = chordList.map((chord) => {
				// console.log(chordList)
				// console.log(chord.id, parseInt(result.draggableId))
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
			})
			// console.log(reorderedChordbook)
			setChordList(reorderedChordbook)
			// update the playlist state
		}
		// [chordList]
	)
	useEffect(() => {
		// if (!chordList.length) {
		// 	createSuggestedChords()
		// }
		// const search = axios.get('https://www.scales-chords.com/chord-charts/')
		// console.log(search)
		// if (chordList.length) {
		// 	const newChords = getScaleChords(keyOptionState, modeOptionState)
		// 	console.log(newChords)
		// 	setChordList(newChords)
		// }
	}, [chordList])
	// useEffect(() => {}, [])

	return (
		<div className='chordbook-con'>
			<div className='chordbook-main'>
				<div className='header'>
					{/* <ChordImage chordName={'Am'} /> */}
					<h2>Chordbook!</h2>
				</div>
				<div className='key-mode-select-con'>
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
					<select
						name='ModeSelector'
						id='mode_selector'
						value={modeOptionState}
						onChange={(e) => setModeOptionState(e.target.value)}
					>
						<option value='ionian'>Ionian (I) - major</option>
						<option value='dorian'>Dorain (II) - major</option>
						<option value='phrygian'>Phrygian (III) - minor</option>
						<option value='Lydian'>Lydian (IV) - major</option>
						<option value='mixolydian'>Mixolydian (V) - major</option>
						<option value='aeolian'>Aeolian (VI) - minor</option>
						<option value='locrian'>Locrian (VII) - diminished</option>
					</select>
					<button
						className='key-mode-submit'
						onClick={(e) => handleScaleChange(e)}
					>
						Get Scale
					</button>
				</div>
				<div className='chord-con'>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='CHORDBOOK' direction='horizontal'>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className='chords'
								>
									{listRenderer}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						{/* <button className='add-chord' onClick={createSuggestedChords}>
							+
						</button> */}
					</DragDropContext>
				</div>
			</div>
			{/* <style>
				@import
				url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Yantramanav:wght@100&display=swap');
			</style> */}
		</div>
	)
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
