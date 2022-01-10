import { useState, useEffect } from 'react'
import { useAppState } from '../../state'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { spotify } from '../config/Connection'
import axios from 'axios'
import scaleNotes from './../../state/scaleNotes'
import scaleChordStructure from '../../state/scaleChordStructure'
import { ChordImage } from './../ChordImage'

export const useScaleChords = () => {
	function getScaleChords(root, mode) {
		console.log('root in getScaleChords', root)
		const notes = scaleNotes[root]?.notes
		const structure = scaleChordStructure[`${mode.toLowerCase()}`]
		console.log('Structure!', structure, notes)

		function handleQuality(chordType) {
			const newType =
				chordType === 'min' ? 'm' : chordType === 'maj' ? '' : chordType
			return newType
		}

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
		console.log('Scale Chords created', scaleChords)
		return scaleChords
	}

	return {
		getScaleChords,
	}
}
