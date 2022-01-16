import { useState, useEffect } from 'react'
import { useAppState } from '../../state'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { spotify } from '../config/Connection'
import axios from 'axios'
import scaleNotes from './../../state/scaleNotes'
import scaleChordStructure from '../../state/scaleChordStructure'
import { ChordImage } from './../ChordImage'
import notes from './../../state/notes'
const rawNotes = notes

export const useScaleChords = () => {
	function getScaleChords(root, mode) {
		console.log('root in getScaleChords', root)
		const notes = scaleNotes[root]?.notes
		const structure = scaleChordStructure[`${mode.toLowerCase()}`].notes

		// index of current scale
		const indexOfScale = scaleChordStructure[`${mode.toLowerCase()}`].degree

		console.log(
			'🚀 ~ file: useScaleChords.js ~ line 18 ~ getScaleChords ~ indexOfScale',
			indexOfScale
		)

		function handleQuality(chordType) {
			const newType =
				chordType === 'min' ? 'm' : chordType === 'maj' ? '' : chordType
			return newType
		}

		// map over available notes -> point current note to index of desired scale
		// index of scale = scaleChordStructure[`${mode.toLowerCase()}`]
		// index of degree(I) relation to destined mode (II - VII)
		//

		const scaleChords = notes.map((note, idx) => {
			console.log('structure:', note, structure[idx], idx)
			return {
				id: idx + 1,
				root: note,
				type: structure[idx],
				position: idx + 1,
				// image: root + handleQuality(structure[idx]),
				// image: <ChordImage chordName={root + handleQuality(structure[idx])} />,
			}
		})
		console.log(
			'Index of Scale:',
			indexOfScale,
			'Notes presented:',
			rawNotes,
			'root',
			root,
			'mode',
			mode
		)
		return scaleChords
	}

	return {
		getScaleChords,
	}
}
