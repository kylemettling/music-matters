import { useState } from 'react'
import { useAppState } from '../../state'

export const useChordbook = () => {
	const [token, setToken] = useState('')
	const { getScaleChords } = useAppState()
	const [chordbooks, setChordbooks] = useState([])
	const [chordCount, setChordCount] = useState(0)
	const [bookCount, setBookCount] = useState(0)
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
			id: starterBook.chords.length + 1,
			root: '',
			type: 'blank',
			position: 1,
			degree: 'above to start',
		}
		// setChordCount(chordCount + 1)
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
		const newChordCount = newList.reduce(
			(acc, curr) => acc + curr.chords.length,
			chordCount
		)
		console.log('done with book', newList, newChordCount)
		setChordbooks(newList)
		setChordCount(newChordCount)
	}
	// const createIntroBook = () => {
	// 	const blankChord = {
	// 		id: chordCount + 1,
	// 		root: '',
	// 		type: 'blank',
	// 		position: 1,
	// 		degree: 'above to start',
	// 	}
	// 	setChordCount(chordCount + 1)
	// 	const introBook = {
	// 		id: 1,
	// 		name: 'intro',
	// 		root: '',
	// 		mode: '',
	// 		type: 'intro',
	// 		bookId: 1,
	// 		chords: [blankChord],
	// 	}
	// }
	const updateStarterChordbook = (newChords, bookId) => {
		// console.log(chordbooks, chordCount)
		console.log('new chords!~', newChords, bookId)
		const copy = chordbooks.slice()
		const update = copy.map((book) => {
			if (book.bookId === bookId) {
				console.log('book!', book)
				book.chords = newChords
				return book
			} else {
				return book
			}
		})
		// const update = [...copy]
		console.log(update)
		setChordbooks(update)
		// setChordCount
		// setBookCount
	}
	const sanitizeIds = () => {
		// console.log(chordCount)
	}

	return {
		chordbooks,
		createStartingBook,
		// createIntroBook,
		setChordbooks,
		updateStarterChordbook,
		sanitizeIds,
	}
}
