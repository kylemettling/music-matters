import React, { useEffect, useState, ReactDOM } from 'react'
import { useScript } from './hooks/useScript'
import { GiGuitarHead } from 'react-icons/gi'
import './chord-image.css'
import DOMPurify from 'dompurify'
// import { useEffect } from 'react'

export function ChordImage({ chordName }) {
	// useScript('https://www.scales-chords.com/api/scales-chords-api.js')
	// console.log('chordName: ', chordName.replace('#', '%23'))
	const [toggle, setToggle] = useState(true)
	const [chord, setChordName] = useState(chordName)
	// useEffect(() => {
	// 	setChordName(chordName)
	// }, [chordName])

	function toggleHidden(e) {
		// e.preventDefault()
		// const hmm = document.querySelector('.guitar')
		// console.log(hmm)
		setToggle(!toggle)
		// console.log(toggle)
	}

	useEffect(() => {
		if (!toggle) {
			console.log(toggle)
		}
		if (toggle) {
			console.log(toggle)
		}
	}, [toggle])

	return (
		// <React.Fragment>
		<div className='chord-image-con'>
			<button
				className='show-chord'
				style={{
					// backgroundColor: 'black',
					border: 'transparent',
					width: '50px',
					height: '25px',
					paddingTop: '2px',
					// color: 'white',
				}}
				onClick={(e) => toggleHidden(e)}
			>
				<GiGuitarHead
				// onClick={(e) => toggleHidden(e)}
				/>
			</button>
			<div
				className={`chord-image guitar-icon ${toggle ? 'chord-hidden' : ''}`}
			>
				<img src={`/img/${chordName}.svg`} alt={`${chordName}-img`} />
				{/* <span>{chordName}</span> */}
			</div>
		</div>
		// </React.Fragment>
	)
}
