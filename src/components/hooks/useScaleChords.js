import { useState, useEffect } from 'react'
import { useAppState } from '../../state'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { spotify } from '../config/Connection'
import axios from 'axios'
import scaleNotes from './../../state/scaleNotes'
import scaleChordStructure from '../../state/scaleChordStructure'
import { ChordImage } from './../ChordImage'
import rawNotes from './../../state/rawNotes'
// const rawNotes = notes

export const useScaleChords = () => {
	function getScaleChords(root, mode) {
		// console.log('root in getScaleChords', root)
		const notes = scaleNotes[root]?.notes
		// console.log(
		// 	'🚀 ~ file: useScaleChords.js ~ line 16 ~ getScaleChords ~ notes',
		// 	notes
		// )
		const structure = scaleChordStructure[`${mode.toLowerCase()}`].notes
		console.log(
			'🚀 ~ file: useScaleChords.js ~ line 17 ~ getScaleChords ~ structure',
			structure
		)
		// index of current scale
		const degreeOfScale = scaleChordStructure[`${mode.toLowerCase()}`].degree
		console.log(
			'🚀 ~ file: useScaleChords.js ~ line 27 ~ getScaleChords ~ degreeOfScale',
			degreeOfScale
		)
		// console.log(
		// 	'🚀 ~ file: useScaleChords.js ~ line 20 ~ getScaleChords ~ degreeOfScale',
		// 	degreeOfScale
		// )
		const indexOfRootNote = rawNotes.indexOf(root)
		console.log(
			'🚀 ~ file: useScaleChords.js ~ line 33 ~ getScaleChords ~ indexOfRootNote',
			indexOfRootNote
		)
		// console.log(
		// 	'🚀 ~ file: useScaleChords.js ~ line 33 ~ getScaleChords ~ indexOfRootNote',
		// 	indexOfRootNote
		// )

		// find major scale relative to
		const relativeScaleIndex = indexOfRootNote - degreeOfScale
		console.log(
			'🚀 ~ file: useScaleChords.js ~ line 41 ~ getScaleChords ~ relativeScaleIndex',
			relativeScaleIndex
		)
		// const scaleNotesLength = Object.keys(scaleNotes).length
		const testArr = []
		for (let noteSet of Object.keys(scaleNotes)) {
			let notes = scaleNotes[noteSet]
			testArr.push({ root: noteSet, notes })
			// console.log(noteSet, notes)
		}
		// console.log(testArr.filter(()))
		let scaleNoteIndexSearch = testArr.filter((noteSet) => {
			// console.log(noteSet.notes.notes[degreeOfScale] === root)
			// console.log(noteSet.notes[degreeOfScale] === root, degreeOfScale, root)
			// console.log('NOTE SET!!!', noteSet)
			return noteSet.notes.notes[degreeOfScale - 1] === root
				? noteSet.notes.notes
				: null
		})
		// console.log(root, relativeScaleIndex);
		// console.log(
		// 	'🚀 ~ file: useScaleChords.js ~ line 58 ~ getScaleChords ~ root',
		// 	root
		// )
		// console.log('SEARCH!!!', scaleNoteIndexSearch)

		console.log('TEST ARR', testArr)

		if (!scaleNoteIndexSearch) {
			scaleNoteIndexSearch = testArr.filter((noteSet) => {
				//   const isFlat = null
				const isFlat = noteSet.root[1] === 'b'
				const isSharp = noteSet.root[1] === '#'
				const newRootIndex = isFlat
					? rawNotes.indexOf(root) + 1
					: rawNotes.indexOf(root) - 1

				console.log(
					'new root:',
					rawNotes.indexOf(
						isFlat ? rawNotes.indexOf(root) : rawNotes.indexOf(root)
					)
				)
				console.log(noteSet, isFlat, isSharp)
				return noteSet.notes.notes[degreeOfScale - 1] === root
					? noteSet.notes.notes
					: null
			})
		}

		const copyOfNotes = scaleNoteIndexSearch[0].notes.notes.slice()
		const first = copyOfNotes.slice(degreeOfScale - 1)
		const last = copyOfNotes.slice(0, degreeOfScale - 1)
		// console.log('NOTES!!!', first, last)
		const correctNotes = [...first, ...last]
		console.log(correctNotes)
		// console.log(scaleNoteIndexSearch)
		// console.log(rawNotes[relativeScaleIndex])

		// console.log(root, indexOfRootNote, degreeOfScale)

		// console.log(
		// 	'🚀 ~ file: useScaleChords.js ~ line 18 ~ getScaleChords ~ indexOfScale',
		// 	indexOfScale
		// )

		// function handleQuality(chordType) {
		// 	const newType =
		// 		chordType === 'min' ? 'm' : chordType === 'maj' ? '' : chordType
		// 	return newType
		// }

		// map over available notes -> point current note to index of desired scale
		// index of scale = scaleChordStructure[`${mode.toLowerCase()}`]
		// index of degree(I) relation to destined mode (II - VII)
		//

		// const scaleChords = scaleNoteIndexSearch[0].notes.notes.map((note, idx) => {
		const scaleChords = correctNotes.map((note, idx) => {
			// console.log('structure:', note, structure[idx], idx)
			return {
				id: idx + 1,
				root: note,
				type: structure[idx],
				position: idx + 1,
				// image: root + handleQuality(structure[idx]),
				// image: <ChordImage chordName={root + handleQuality(structure[idx])} />,
			}
		})
		console.log(scaleChords)
		// console.log(
		// 	'Index of Scale:',
		// 	degreeOfScale,
		// 	'Notes presented:',
		// 	rawNotes,
		// 	'root',
		// 	root,
		// 	'mode',
		// 	mode
		// )
		return scaleChords
	}

	return {
		getScaleChords,
	}
}
