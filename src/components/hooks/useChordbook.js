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
			root: 'drag chord',
			type: 'blank',
			position: 1,
			// isErasable: false,
			degree: 'down to start',
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
		const copy = chordbooks.slice()
		let count = 0
		for (const book of copy) {
			for (let i = 0; i < book.chords.length; i++) {
				// console.log(book.chords.length, book.chords[i], i, count);
				book.chords[i].id = count
				book.chords[i].position = i + 1
				count++
				// console.log(book.chords.length, book.chords[i], i, count);
			}
		}
		setChordbooks(copy)
		setChordCount(count)
	}
	const sanitizeChordbookIds = (copy) => {
		// const copy = chordbooks.slice();
		let count = 0
		// for (const book of copy) {
		for (let i = 0; i < copy.length; i++) {
			// console.log(book.chords.length, book.chords[i], i, count);
			copy[i].id = count
			// book.chords[i].position = i + 1;
			count++
			// console.log(book.chords.length, book.chords[i], i, count);
		}
		// }
		console.log('after sanitize', copy)
		setChordbooks(copy)
		// setChordCount(count);
	}

	const createBook = (id) => {
		const copy = chordbooks.slice()
		// console.log("id", id);
		const blankChord = {
			id: chordCount + 1,
			root: '',
			type: 'blank',
			position: 1,
			// isErasable: false,
			degree: '',
		}
		const newBook = {
			//   id: chordbooks.length + 1,
			id: id + 1,
			// insert snazzy song part name function here
			name: 'new book',
			root: '',
			mode: '',
			type: '',
			bookId: chordbooks.length + 1,
			isErasable: true,
			chords: [],
		}
		console.log('new book', newBook)
		copy.splice(id + 1, 0, newBook)
		// console.log("new book inserted", copy);
		// const newList = [...copy, newBook];
		const count = copy.reduce(
			(acc, curr) => acc + curr.chords.length,
			chordCount
		)
		setChordCount(count)
		// setChordbooks(copy);
		sanitizeChordbookIds(copy)
	}

	const deleteBook = (id) => {
		const copy = chordbooks.slice()
		console.log(copy, id, copy[id])
		const newList = copy.filter((book) => book.id !== id)
		console.log(newList)
		const count = newList.reduce(
			(acc, curr) => acc + curr.chords.length,
			chordCount
		)
		setChordCount(count)
		sanitizeChordbookIds(newList)
	}

	const updateChordbook = (id, property, value) => {
		const copy = chordbooks.slice()
		const update = copy.map((book) => {
			if (book.id === id) {
				book[property] = value
				return book
			} else {
				return book
			}
		})
		setChordbooks(update, value)
	}
	// update chord from passing ids of book and chord and the property to update with the new value
	const updateChord = (bookId, id, property, value) => {
		const copy = chordbooks.slice()
		const update = copy.map((book) => {
			if (book.id === parseInt(bookId)) {
				book.chords.map((chord) => {
					if (chord.id === id) {
						chord[property] = value
						return chord
					} else {
						return chord
					}
				})
				return book
			} else {
				return book
			}
		})
		setChordbooks(update)
	}

	return {
		chordbooks,
		createStartingBook,
		// createIntroBook,
		updateChordbook,
		updateChord,
		deleteBook,
		createBook,
		setChordbooks,
		updateStarterChordbook,
		sanitizeIds,
	}
}
