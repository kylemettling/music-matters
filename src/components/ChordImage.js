import React, { useEffect, useState, useRef } from 'react'
import './chordImage.css'

export function ChordImage({ chordName }) {
	const [isZoomed, setIsZoomed] = useState(false)
	const [chord, setChordName] = useState(chordName)
	const imageRef = useRef(null)
	const zoomRef = useRef(null)

	function handleImageClick(e) {
		setIsZoomed(!isZoomed)
	}

	function handleImgName(name) {
		const newName = name.includes('#') ? name.replace('#', 'sharp') : name
		return newName
	}

	useEffect(() => {
		setChordName(chordName)

		const checkIfZoomClickedOutside = (e) => {
			if (zoomRef.current && !zoomRef.current.contains(e.target)) {
				setIsZoomed(false)
			}
		}
		document.addEventListener('mousedown', checkIfZoomClickedOutside)
	}, [chordName, zoomRef])

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
						<div
							className={`chord-image${isZoomed ? '-zoom' : ''}`}
							ref={zoomRef}
						>
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
