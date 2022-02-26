import axios from 'axios'
import './trackDetail.css'
// import './style.css'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router'
import { shazam, spotify, pianoChords } from './config/Connection'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useTrack, useTrackFeatures } from './hooks'
import { useAppState } from './../state'
import { Chordbook } from './Chordbook'
import keyTranslation from '../state/keyTranslation'
import Chord from './Chord'
import { orderBy, random, range } from 'lodash'
import { BackButton } from './BackButton'

export function TrackDetail() {
	const { id } = useParams()
	const scrollRef = useRef(null)

	const {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		artistURL,
		artistCover,
		setTrack,
		songKey,
		songKeyCenterQuality,
		spotifySongId,
		getStoredToken,
		token,
		refreshToken,
		setTrackFeatures,
		isActiveTrack,
		isStoredTrack,
		setIsActiveTrack,
		clearTrackData,
		getScaleChords,
		getTrackFeatures,
		getArtistCoverURL,
	} = useAppState()
	const [chordPalettes, setChordPalettes] = useState([
		{
			id: 1,
			name: 'suggested scale',
			root: songKey,
			mode: songKeyCenterQuality,
			type: 'starter',
			bookId: 1,
		},
	])
	const [chordLists, setChordLists] = useState([])
	const [keyOptionState, setKeyOptionState] = useState(undefined)
	const [modeOptionState, setModeOptionState] = useState(undefined)

	function createSuggestedChords() {
		console.log(keyTranslation[songKey], songKeyCenterQuality)
		const chords = getScaleChords(keyTranslation[songKey], songKeyCenterQuality)
		console.log('chords', chords)
		setKeyOptionState(keyTranslation[songKey])
		setModeOptionState(songKeyCenterQuality === 1 ? 'mixolydian' : 'aeolian')
		// console.log(chords)
		// setChordsList(chords)

		setChordPalettes((prevState) => [...prevState, chords])
	}
	function handleScaleChange(e) {
		console.log('pressed')
		const newChords = getScaleChords(keyOptionState, modeOptionState)
		console.log('NEW!', newChords)
		setKeyOptionState(keyOptionState)
		setModeOptionState(modeOptionState)
		setChordPalettes(newChords)
	}

	async function getTrack(storedId) {
		const options = {
			method: 'GET',
			url: spotify.urls.getTrack + (id || storedId),
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		const fetchTrack = async () => {
			const search = await axios
				.request(options)
				.catch((err) => console.log(err))
			if (!search) {
				refreshToken()
				fetchTrack()
			}
			const trackData = await search.data
			// getTrackFeatures(trackData.id, token)
			// getArtistCoverURL(trackData.artists[0].href, token)
			return trackData
		}
		const data = await fetchTrack()
		setTrack(data, token)
		setIsActiveTrack(true)
	}

	const storeTrack = () => {
		localStorage.setItem('songTitle', songTitle)
		localStorage.setItem('songArtist', songArtist)
		localStorage.setItem('songAlbum', songAlbum)
		localStorage.setItem('songKey', songKey)
		localStorage.setItem('songMode', songKeyCenterQuality)
		localStorage.setItem('spotifySongId', spotifySongId)
		localStorage.setItem('albumCoverURL', albumCoverURL)
		localStorage.setItem('artistURL', artistCover.url)
	}

	const getStoredTrack = () => {
		const path = window.location.pathname.split('/')
		const currentTrackId = path[path.length - 1]
		const storedTrackId = localStorage.getItem('trackId')
		if (!storedTrackId) {
			getTrack(currentTrackId)
		}
	}

	const move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source)
		const destClone = Array.from(destination)
		const [removed] = sourceClone.splice(source.index, 1)
		destClone.splice(destination.index, 0, removed)

		const result = {}
		result[droppableSource.droppableId] = sourceClone
		console.log(
			'🚀 ~ file: Chordbook.js ~ line 71 ~ move ~ result[droppableSource.droppableId] ',
			result[droppableSource.droppableId]
		)
		result[droppableDestination.droppableId] = destClone
		console.log(
			'🚀 ~ file: Chordbook.js ~ line 73 ~ move ~ result[droppableDestination.droppableId]',
			result[droppableDestination.droppableId]
		)

		console.log('MOVE RESULT', result)

		return result
	}

	// const onDragEnd = useCallback((result) => {

	// 	if (destination.droppableId !== source.droppableId) {
	// 		const result = move(
	// 			source.droppableId,
	// 			destination.droppableId,
	// 			source,
	// 			destination
	// 		)
	// 		console.log('PROVIDED end', result)
	// 		setChordPalettes(result)
	// 	}
	// })

	function createBlankPalette() {
		console.log('new palette!')
		//  <Chordbook root='F' mode='ionian' type='blank' />
		const blank = {
			id: chordPalettes.length + 1,
			name: 'this is a big card name',
			root: '',
			mode: '',
			type: 'blank',
			bookId: chordPalettes.length + 1,
		}

		// const newPalette = <Chordbook id={chordPalettes.length + 1} />
		const palettes = [...chordPalettes, blank]
		// const listRenderer = orderBy(palettes, 'position').map((palette) => (
		// 	<Chordbook
		// 		key={palette.id}
		// 		root={palette.root}
		// 		type={palette.type}
		// 		id={palette.id}
		// 		position={palette.position}
		// 	/>
		// ))
		setChordPalettes(palettes)
	}
	const onDragEnd = useCallback((result) => {
		const { destination, source, droppableId } = result
		console.log(result)
		console.log(destination, source, droppableId)

		// // detect
		// // adding blur animation to non-dragging chords
		// const elements = document.querySelectorAll(
		// 	`.chord-detail.droppableId-${source.droppableId}`
		// )
		// for (let i = 0; i < elements.length; i++) {
		// 	elements[i].classList.remove('blur')
		// }
		// // make sure change occurs
		// if (!destination || !source) {
		// 	return
		// }
		// // access to initial (source) position
		// // access to dropped (destination) position
		// if (
		// 	destination.droppableId === source.droppableId &&
		// 	destination.index === source.index
		// ) {
		// 	return
		// } else if (destination.droppableId !== source.droppableId) {
		// 	console.log(destination, source)
		// }

		// // checking if the source droppableId is the same as the destination droppableId
		// if (destination.droppableId === source.droppableId) {
		// 	// check the direction (> or <)
		// 	const directionOfDrag =
		// 		destination.index > source.index ? 'GREATER' : 'LESS'

		// 	// find the affected range
		// 	let affectedRange
		// 	if (directionOfDrag === 'GREATER') {
		// 		affectedRange = range(source.index, destination.index + 1)
		// 	} else {
		// 		affectedRange = range(destination.index, source.index)
		// 	}
		// 	// console.log('drag result', result)

		// 	// if songs affected (+ or -) update positions
		// 	const reorderedChordbook = chordList.map((chord) => {
		// 		if (chord.id === parseInt(result.draggableId)) {
		// 			chord.position = destination.index
		// 			// console.log('condition 1', chord)
		// 			return chord
		// 		} else if (affectedRange.includes(chord.position)) {
		// 			if (directionOfDrag === 'GREATER') {
		// 				chord.position = chord.position - 1
		// 				// console.log('condition 2.1', chord)
		// 				return chord
		// 			} else if (directionOfDrag === 'LESS') {
		// 				chord.position = chord.position + 1
		// 				// console.log('condition 2.2', chord)
		// 				return chord
		// 			}
		// 		} else {
		// 			// console.log('condition 3', chord)
		// 			return chord
		// 		}
		// 	})
		// 	// console.log(reorderedChordbook)
		// 	// update the playlist state
		// 	setChordsList(reorderedChordbook)
		// }
	})
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({
				behavior: 'smooth',
			})
		}
		getTrack(id)
		if (songKey && songKeyCenterQuality) {
			setIsActiveTrack(true)
			createBlankPalette()
			createBlankPalette()
			// storeTrack()
			console.log(songKey, songKeyCenterQuality)
		}
		// if (chordPalettes.length) {
		// }
		// }
	}, [
		songTitle,
		songArtist,
		isActiveTrack,
		scrollRef,
		songKey,
		songKeyCenterQuality,
	])

	if (!songTitle && !songKey) return null
	// if (!track ) return null

	return (
		<div className='track'>
			<div
				className='detailCard grid'
				//  ref={scrollRef}
			>
				<div className='details ' ref={scrollRef}>
					<h1 className='trackTitle'>
						{/* <a href="#"> */}
						{songTitle}
						{/* </a> */}
					</h1>
					<h2 className='trackArtist'>{songArtist}</h2>
					<img
						className='trackCover'
						src={albumCoverURL}
						alt={[songAlbum] + ' cover'}
					></img>
					<h5 className='trackAlbum'>{songAlbum}</h5>
				</div>

				<img
					className='artistImage'
					ref={scrollRef}
					// style={{
					//   height: `${
					//     artistCover.h > 900 ? artistCover.h / 2 : artistCover.h / 1.4
					//   }px`,
					//   width: `${artistCover.w / 1.4}px`,
					// }}
					src={artistCover.url}
					alt={[songAlbum] + ' cover'}
				></img>
			</div>
			<div className='chordbook-container flex'>
				<Chordbook />
				{/* <DragDropContext onDragEnd={onDragEnd}>
					{chordPalettes.map((palette, idx) => {
						console.log(palette)
						return (
							<div className='chordbook'>
								<Chordbook
									key={idx}
									type={palette.type}
									name={palette.name}
									bookId={palette.bookId}
								/>
							</div>
						)
					})}
				</DragDropContext> */}
			</div>
		</div>
	)
}
