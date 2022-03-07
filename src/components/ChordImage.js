import React, { useEffect, useState, useRef } from 'react'
import { GiGuitarHead } from 'react-icons/gi'
import { useOutsideClick } from './hooks/'
import './chordImage.css'

export function ChordImage({ chordName }) {
	const [isZoomed, setIsZoomed] = useState(false)
	const [chord, setChordName] = useState(chordName)
	const imageRef = useRef(null)
	// const {}

	function handleImageClick(e) {
		// const
		setIsZoomed(!isZoomed)
		// console.log(isImageToggled)
	}

	function handleImgName(name) {
		const newName = name.includes('#') ? name.replace('#', 'sharp') : name
		// console.log(newName);
		return newName
	}

	useEffect(() => {
		// if (!toggle) {
		// 	console.log(toggle)
		// }
		// if (toggle) {
		// 	console.log(toggle)
		// }
		setChordName(chordName)
	}, [chordName, chord])

	return (
		<div className='chord-image-con'>
			{chord && (
				<div className={`chord-image`}>
					<img
						ref={imageRef}
						onClick={handleImageClick}
						src={`/img/${handleImgName(chord)}.svg`}
						alt={`${chord}-img`}
					/>
					{isZoomed && (
						<div className={`chord-image${isZoomed ? '-zoom' : ''}`}>
							<img
								onClick={handleImageClick}
								src={`/img/${handleImgName(chord)}.svg`}
								alt={`${chord}-img-zoom`}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
