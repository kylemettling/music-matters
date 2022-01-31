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
	const [songLyrics, setSongLyrics] = useState({ text: '', footer: '' })
	const [rootChords, setRootChords] = useState([])
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
			key: '',
			root: '',
			type: '',
			id: '',
			position: chordPalettes.length + 1,
		}
		const newPalette = <Chordbook {...blank} />
		const palettes = [...chordPalettes, newPalette]
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

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({
				behavior: 'smooth',
			})
		}
		getTrack(id)
		if (songKey && songKeyCenterQuality) {
			setIsActiveTrack(true)
			// storeTrack()
			console.log(songKey, songKeyCenterQuality)
		}
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
			<BackButton />
			<section className='chordbookContainer'>
				{/* <div className='chordbookHeader'> */}
				{/* <div className='keyModeSelect'>
						<div>
							<label>Root</label>
							<select
								name='KeySelector'
								id='key_selector'
								value={keyOptionState}
								onChange={(e) => setKeyOptionState(e.target.value)}
							>
								<option value='C'>C</option>
								<option value='C#'>C#</option>
								<option value='Db'>Db</option>
								<option value='D'>D</option>
								<option value='D#'>D#</option>
								<option value='Eb'>Eb</option>
								<option value='E'>E</option>
								<option value='F'>F</option>
								<option value='F#'>F#</option>
								<option value='Gb'>Gb</option>
								<option value='G'>G</option>
								<option value='G#'>G#</option>
								<option value='Ab'>Ab</option>
								<option value='A'>A</option>
								<option value='A#'>A#</option>
								<option value='Bb'>Bb</option>
								<option value='B'>B</option>
							</select>
						</div>
						<div>
							<label>Mode</label>
							<select
								name='ModeSelector'
								id='mode_selector'
								value={modeOptionState}
								onChange={(e) => setModeOptionState(e.target.value)}
							>
								<option value='ionian'>Ionian (I) - major</option>
								<option value='dorian'>Dorain (II) - minor</option>
								<option value='phrygian'>Phrygian (III) - minor</option>
								<option value='lydian'>Lydian (IV) - major</option>
								<option value='mixolydian'>Mixolydian (V) - major</option>
								<option value='aeolian'>Aeolian (VI) - minor</option>
								<option value='locrian'>Locrian (VII) - diminished</option>
							</select>
						</div>
						<button
							className='keyModeSubmit'
							onClick={(e) => handleScaleChange(e)}
						>
							Get Scale
						</button>
					</div> */}
				{/* )} */}
				<DragDropContext>
					{chordPalettes.map((palette, idx) => {
						console.log(palette)
						return (
							<Chordbook
								key={idx}
								// root={palette.root}
								// mode={palette.mode}
								type={palette.type}
								name={palette.name}
								bookId={palette.id}
							/>
						)
					})}
				</DragDropContext>
				{/* </div> */}
				<button onClick={createBlankPalette}>+</button>
				<span>Key: {songKey}</span>
				<span>Translated: {keyTranslation[songKey]}</span>
				<span>Mode: {songKeyCenterQuality}</span>
				{/* <span>
					Mode: {songKeyCenterQuality === 1 ? 'mixolydian' : 'aeolian'}
				</span> */}
			</section>
		</div>
	)
}
