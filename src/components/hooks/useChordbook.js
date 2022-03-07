import { inRange } from "lodash";
import { useState } from "react";
import { useAppState } from "../../state";

export const useChordbook = () => {
  const [token, setToken] = useState("");
  const { getScaleChords } = useAppState();
  const [chordbooks, setChordbooks] = useState([]);
  const [chordCount, setChordCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  // chord list
  // const updateChordList = (chordList, chords) => {
  // 	const prev = chordList.slice()
  // 	setChordbooks((prevState) => [...prevState, ...chordList])
  // }
  const createStartingBook = (key, quality) => {
    const copy = chordbooks.slice();
    const starterBook = {
      id: 0,
      name: "suggested scale",
      root: key,
      mode: quality,
      type: "starter",
      bookId: 0,
      chords: getScaleChords(key, quality),
    };
    const blankChord = {
      id: starterBook.chords.length + 1,
      root: "",
      type: "blank",
      position: 1,
      degree: "above to start",
    };
    // setChordCount(chordCount + 1)
    const introBook = {
      id: 1,
      name: "intro",
      root: key,
      mode: quality,
      type: "intro",
      bookId: 1,
      chords: [blankChord],
    };

    const newList = [...copy, starterBook, introBook];
    const newChordCount = newList.reduce(
      (acc, curr) => acc + curr.chords.length,
      chordCount
    );
    setChordbooks(newList);
    setChordCount(newChordCount);
  };
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
    const copy = chordbooks.slice();
    const update = copy.map((book) => {
      if (book.bookId === bookId) {
        book.chords = newChords;
        return book;
      } else {
        return book;
      }
    });
    setChordbooks(update);
    // setChordCount
    // setBookCount
  };
  const sanitizeIds = () => {
    console.log(chordbooks, chordCount);
    const copy = chordbooks.slice();
    const updatedIndexes = copy.map((book) => book.chords);
    let count = 0;
    for (const book of updatedIndexes) {
      console.log(book);
      for (let i = 0; i < book.length; i++) {
        book[i].id = count;
        book[i].position = i + 1;
        count++;
        //   for (let chord of book) {
        //     chord.id = count;
        //     count++;
      }
    }
    console.log(updatedIndexes);
    // setChordCount(count);
    // setChordbooks(updatedIndexes);
  };

  return {
    chordbooks,
    createStartingBook,
    // createIntroBook,
    setChordbooks,
    updateStarterChordbook,
    sanitizeIds,
  };
};
