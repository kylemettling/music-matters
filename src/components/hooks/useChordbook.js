import { inRange } from 'lodash'
import { useState } from 'react'
import { useAppState } from '../../state'

export const useChordbook = () => {
	const { getScaleChords } = useAppState()
	const [chordbooks, setChordbooks] = useState([])
	const [chordCount, setChordCount] = useState(0)
	const [bookCount, setBookCount] = useState(0)
	const createStartingBook = (key, quality) => {
		const copy = chordbooks.slice()
		const starterBook = {
			id: 0,
			name: 'suggested scale',
			root: key,
			mode: quality,
			type: 'starter',
			isErasable: false,
			bookId: 0,
			chords: getScaleChords(key, quality),
		}
		const blankChord = {
			id: starterBook.chords.length + 1,
			root: '',
			type: 'blank',
			position: 1,
			// isErasable: false,
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
			isErasable: true,
			chords: [blankChord],
		}

		const newList = [...copy, starterBook, introBook]
		const newChordCount = newList.reduce(
			(acc, curr) => acc + curr.chords.length,
			chordCount
		)
		setChordbooks(newList)
		setChordCount(newChordCount)
	}
	const updateStarterChordbook = (newChords, bookId) => {
		// const copy = chordbooks.slice();
		const copy = [...chordbooks]
		const update = copy.map((book) => {
			if (book.bookId === bookId) {
				book.chords = newChords
				return book
			} else {
				return book
			}
		})
		// console.log("update", update);
		setChordbooks(update)
		// setChordCount
		// setBookCount
	}
	const sanitizeIds = () => {
		// console.log(chordbooks, chordCount);
		const copy = chordbooks.slice()
		let count = 0
		for (const book of copy) {
			for (let i = 0; i < book.chords.length; i++) {
				book.chords[i].id = count
				book.chords[i].position = i + 1
				count++
			}
		}
		setChordbooks(copy)
		setChordCount(count)
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
