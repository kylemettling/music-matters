import { inRange } from "lodash";
import { useState } from "react";
import { useAppState } from "../../state";

export const useChordbook = () => {
  const { getScaleChords } = useAppState();
  const [chordbooks, setChordbooks] = useState([]);
  const [chordCount, setChordCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const createStartingBook = (key, quality) => {
    const copy = chordbooks.slice();
    const starterBook = {
      id: 0,
      name: "suggested scale",
      root: key,
      mode: quality,
      type: "starter",
      isErasable: false,
      bookId: 0,
      chords: getScaleChords(key, quality),
    };
    const blankChord = {
      id: starterBook.chords.length + 1,
      root: "drag chord",
      type: "blank",
      position: 1,
      // isErasable: false,
      degree: "to start",
    };
    // setChordCount(chordCount + 1)
    const introBook = {
      id: 1,
      name: "intro",
      root: key,
      mode: quality,
      type: "intro",
      bookId: 1,
      isErasable: true,
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
  const updateStarterChordbook = (newChords, bookId) => {
    // const copy = chordbooks.slice();
    const copy = [...chordbooks];
    const update = copy.map((book) => {
      if (book.bookId === bookId) {
        book.chords = newChords;
        return book;
      } else {
        return book;
      }
    });
    // console.log("update", update);
    setChordbooks(update);
    // setChordCount
    // setBookCount
  };
  const sanitizeIds = () => {
    const copy = chordbooks.slice();
    let count = 0;
    for (const book of copy) {
      for (let i = 0; i < book.chords.length; i++) {
        // console.log(book.chords.length, book.chords[i], i, count);
        book.chords[i].id = count;
        book.chords[i].position = i + 1;
        count++;
        // console.log(book.chords.length, book.chords[i], i, count);
      }
    }
    setChordbooks(copy);
    setChordCount(count);
  };

  const createBook = () => {
    const copy = chordbooks.slice();
    const blankChord = {
      id: 1,
      root: "",
      type: "blank",
      position: 1,
      // isErasable: false,
      degree: "",
    };
    const newBook = {
      id: copy.length + 1,
      // insert snazzy song part name function here
      name: "new book",
      root: "",
      mode: "",
      type: "intro",
      bookId: copy.length + 1,
      isErasable: true,
      chords: [blankChord],
    };
    const newList = [...copy, newBook];
    const count = newList.reduce(
      (acc, curr) => acc + curr.chords.length,
      chordCount
    );
    setChordCount(count);
    setChordbooks(newList);
  };

  return {
    chordbooks,
    createStartingBook,
    // createIntroBook,
    createBook,
    setChordbooks,
    updateStarterChordbook,
    sanitizeIds,
  };
};
