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

const nums = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const dim = '°'
export const useScaleChords = () => {
	function getScaleChords(root, mode) {
		console.log(root, mode)
		const notes = scaleNotes[root]?.notes
		const structure = scaleChordStructure[`${mode.toLowerCase()}`].notes
		console.log(
			'🚀 ~ file: useScaleChords.js ~ line 17 ~ getScaleChords ~ structure',
			structure
		)
		// index of current scale
		const degreeOfScale = scaleChordStructure[`${mode.toLowerCase()}`].degree
		const indexOfRootNote = rawNotes.indexOf(root)

		// find major scale relative to
		const relativeScaleIndex = (indexOfRootNote - degreeOfScale) % 7
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
			return noteSet.notes.notes[(degreeOfScale - 1) % 7] === root
				? noteSet.notes.notes
				: null
		})

		console.log('TEST ARR', testArr)

		const copyOfNotes =
			scaleNoteIndexSearch[0]?.notes?.notes.slice() ||
			scaleNoteIndexSearch[1]?.notes?.notes.slice()
		console.log(
			'COPY OF NOTES',
			copyOfNotes,
			'index search: ',
			scaleNoteIndexSearch
		)
		const first = copyOfNotes.slice(degreeOfScale - 1)
		const last = copyOfNotes.slice(0, degreeOfScale - 1)
		const correctNotes = [...first, ...last]
		console.log(correctNotes)
		const getDegree = (type, idx) => {
			const numeral = nums[idx]
			const degree =
				type === 'maj'
					? numeral
					: type === 'min'
					? numeral.toLowerCase()
					: numeral.toLowerCase() + dim
			return degree
		}
		const scaleChords = correctNotes.map((note, idx) => {
			return {
				id: idx + 1,
				root: note,
				type: structure[idx],
				position: idx + 1,
				degree: getDegree(structure[idx], idx),
			}
		})
		console.log(scaleChords)
		return scaleChords
	}

	return {
		getScaleChords,
	}
}
