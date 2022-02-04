import { useState } from 'react'
import { useAppState } from '../../state'

export const useChordbook = () => {
	const [token, setToken] = useState('')
	const { getScaleChords } = useAppState()
	const [chordbooks, setChordbooks] = useState([])
	// chord list
	const updateChordList = (chordList, chords) => {
		const prev = chordList.slice()
		// const selectedList = fullChordList.find(list => list.id === chords.id)
		setChordbooks((prevState) => [...prevState, ...chordList])
	}
	const createStartingBook = (key, quality) => {
		console.log('KEY/QUALITY', key, quality)
		const copy = chordbooks.slice()
		const starterScale = {
			id: 1,
			name: 'suggested scale',
			root: key,
			mode: quality,
			type: 'starter',
			bookId: 1,
			chords: getScaleChords(key, quality),
		}
		const newList = [...copy, starterScale]
		setChordbooks(newList)
	}

	return { chordbooks, setChordbooks, createStartingBook }
}
