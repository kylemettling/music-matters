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
import keyTranslation from '../state/keyTranslation'

export function Chordbook({ root = 'C', mode = 'lydian', type = 'starting' }) {
	const [chordList, setChordList] = useState([])
	const [keyOptionState, setKeyOptionState] = useState('')
	const [modeOptionState, setModeOptionState] = useState('')

	const { songKeyCenterQuality, songKey, chordNotes, getScaleChords } =
		useAppState()

	// function handleQuality(chordType) {
	// 	const newType =
	// 		chordType === 'min' ? 'm' : chordType === 'maj' ? '' : chordType
	// 	return newType
	// }
	// useScript('https://www.scales-chords.com/api/scales-chords-api.js')

	const listRenderer = orderBy(chordList, 'position').map((chord) => (
		<Chord
			key={chord.id}
			root={chord.root}
			chordType={chord.type}
			id={chord.id}
			position={chord.position}
		/>
	))

	function createSuggestedChords() {
		console.log(root, mode)
		const chords = getScaleChords(
			keyTranslation[songKey] || root,
			songKeyCenterQuality === 1 ? 'mixolydian' : 'aeolian' || mode
		)
		setKeyOptionState(root)
		setModeOptionState(mode)
		setChordList(chords)
	}

	function createBlankChords() {
		const chords = [{ id: 1, key: '', root: '', type: '', position: 1 }]
		chords.map((chord) => (
			<Chord
				key={chord.key}
				root={chord.root}
				chordType={chord.type}
				id={chord.id}
				position={chord.position}
			/>
		))
		setChordList(chords)
	}

	function handleScaleChange(e) {
		const newChords = getScaleChords(keyOptionState, modeOptionState)
		console.log(newChords)
		setChordList(newChords)
	}

	// using useCallback is optional
	const onBeforeCapture = useCallback(() => {}, [])
	const onBeforeDragStart = useCallback(() => {}, [])
	const onDragStart = useCallback(() => {
		console.log('ok')
	}, [])
	const onDragUpdate = useCallback(() => {}, [])
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
		// if(type === "blank") {
		// 	setBlankState({

		// 	})
		// }
		// if ((root, mode)) {
		// if ((root, mode)) {
		// if (songKey && songKeyCenterQuality) {
		// console.log(songKeyCenterQuality, keyTranslation[songKey])
		if (type === 'starting') {
			createSuggestedChords()
		} else if (type === 'blank') {
			createBlankChords()
		}
		// }
		// }
		// }
	}, [songKey, songKeyCenterQuality])

	return (
		<div>
			{type === 'starting' && (
				<div className='chordbook-con'>
					<div className='chordbook-main'>
						<div className='header'>
							{type === 'starting' ? (
								<h3>Suggested scale</h3>
							) : (
								<h3>Chordbook!</h3>
							)}
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
								<option value='dorian'>Dorain (II) - minor</option>
								<option value='phrygian'>Phrygian (III) - minor</option>
								<option value='lydian'>Lydian (IV) - major</option>
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
					</div>
				</div>
			)}
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
	)
}
