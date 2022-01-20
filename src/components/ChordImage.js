import React, { useEffect, useState } from 'react'
import { GiGuitarHead } from 'react-icons/gi'
import './chord-image.css'

export function ChordImage({ chordName }) {
	const [toggle, setToggle] = useState(true)
	const [chord, setChordName] = useState(chordName)

	function toggleHidden(e) {
		setToggle(!toggle)
	}

	function handleImgName(name) {
		const newName = name.includes('#') ? name.replace('#', 'sharp') : name
		// console.log(newName);
		return newName
	}

	useEffect(() => {
		if (!toggle) {
			//   console.log(toggle);
		}
		if (toggle) {
			//   console.log(toggle);
		}
		setChordName(chordName)
	}, [toggle, chordName, chord])

	return (
		<div className='chord-image-con'>
			{/* <button
          className="show-chord"
          style={{
            // backgroundColor: 'black',
            border: "transparent",
            width: "50px",
            height: "25px",
            paddingTop: "2px",
            // color: 'white',
          }}
          // onClick={(e) => toggleHidden(e)}
        >
          <GiGuitarHead />
        </button>  */}
			<div
				className={`chord-image guitar-icon ${toggle ? 'chord-hidden' : ''}`}
			>
				<img src={`/img/${handleImgName(chord)}.svg`} alt={`${chord}-img`} />
				{/* <span>{chordName}</span> */}
			</div>
		</div>
	)
}
