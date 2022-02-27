import { useState } from 'react'
import { useAppState } from '../../state'

export const useChordbook = () => {
	const [token, setToken] = useState('')
	const { getScaleChords } = useAppState()
	const [chordbooks, setChordbooks] = useState([])
	const [chordCount, setChordCount] = useState(0)
	// chord list
	// const updateChordList = (chordList, chords) => {
	// 	const prev = chordList.slice()
	// 	setChordbooks((prevState) => [...prevState, ...chordList])
	// }
	const createStartingBook = (key, quality) => {
		console.log('KEY/QUALITY', key, quality)
		const copy = chordbooks.slice()
		const starterBook = {
			id: 0,
			name: 'suggested scale',
			root: key,
			mode: quality,
			type: 'starter',
			bookId: 0,
			chords: getScaleChords(key, quality),
		}
		const blankChord = {
			id: 8,
			root: 'blank',
			type: '',
			position: 1,
			degree: 'above to start',
		}
		const introBook = {
			id: 1,
			name: 'intro',
			root: key,
			mode: quality,
			type: 'intro',
			bookId: 1,
			chords: [blankChord],
		}
		const newList = [...copy, starterBook, introBook]
		// console.log(
		// 	'chord count?',
		// 	newList.reduce((acc, curr) => acc + curr.chords.length, chordCount)
		// )
		const newChordCount = newList.reduce(
			(acc, curr) => acc + curr.chords.length,
			chordCount
		)
		console.log('done with book', newList, newChordCount)
		setChordbooks(newList)
		setChordCount(newChordCount)
	}

	return { chordbooks, createStartingBook, setChordbooks }
}
