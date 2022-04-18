import axios from 'axios'
import './trackDetail.css'
// import './style.css'
import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useLayoutEffect,
} from 'react'
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
import { useLocation } from 'react-router-dom'

function useQuery() {
	const { search } = useLocation()
	return React.useMemo(() => new URLSearchParams(search), [search])
}
export function TrackDetail() {
	const scrollRef = useRef(null)
	const { id } = useParams()
	let query = useQuery()

	const {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		artistCover,
		setTrack,
		songKey,
		songKeyCenterQuality,
		spotifySongId,
		getStoredToken,
		token,
		refreshToken,
		isActiveTrack,
		setIsActiveTrack,
		getArtistCoverURL,
		getTrackFeatures,
	} = useAppState()
	async function getTrack(id) {
		if (!token) {
			refreshToken()
		}
		console.log(id)
		const options = {
			method: 'GET',
			url: spotify.urls.getTrack + id,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		console.log('options', options)
		const fetchTrack = async () => {
			const search = await axios
				.request(options)
				.catch((err) => console.log(err))
			if (!search) {
				refreshToken()
				fetchTrack()
			}
			const trackData = await search.data
			return trackData
		}
		const data = await fetchTrack()
		const url = data.artists[0].href
		console.log('HERE', url, token)
		getArtistCoverURL(url, token)
		getTrackFeatures(data.id, token)
		setTrack(data, token)
		setIsActiveTrack(true)
	}

	// const storeTrack = () => {
	// 	localStorage.setItem('songTitle', songTitle)
	// 	localStorage.setItem('songArtist', songArtist)
	// 	localStorage.setItem('songAlbum', songAlbum)
	// 	localStorage.setItem('songKey', songKey)
	// 	localStorage.setItem('songMode', songKeyCenterQuality)
	// 	localStorage.setItem('spotifySongId', spotifySongId)
	// 	localStorage.setItem('albumCoverURL', albumCoverURL)
	// 	localStorage.setItem('artistURL', artistCover.url)
	// }

	// const getStoredTrack = () => {
	// 	const path = window.location.pathname.split('/')
	// 	const currentTrackId = path[path.length - 1]
	// 	const storedTrackId = localStorage.getItem('trackId')
	// 	if (!storedTrackId) {
	// 		getTrack(currentTrackId)
	// 	}
	// }
	// useLayoutEffect(() => {
	// 	if (scrollRef.current) {
	// 		scrollRef.current.scrollIntoView({
	// 			behavior: 'smooth',
	// 		})
	// 	}
	// }, [scrollRef])
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({
				behavior: 'smooth',
			})
		}
		getTrack(id)
	}, [
		// songTitle,
		// songArtist,
		// isActiveTrack,
		token,
		// songKey,
		// songKeyCenterQuality,
	])

	if (!songTitle && !songKey) return null

	return (
		<div className='track'>
			<div className='detailCard grid'>
				<div
					className='details '
					// ref={scrollRef}
				>
					<h1 className='trackTitle'>
						{/* <a href="#"> */}
						{songTitle}
						{/* </a> */}
					</h1>
					<h2 className='trackArtist'>{songArtist}</h2>
					<img
						className='trackCover'
						src={albumCoverURL}
						alt={songAlbum + ' cover'}
					></img>
					<h3 className='trackAlbum'>{songAlbum}</h3>
				</div>

				<img
					className='artistImage'
					ref={scrollRef}
					src={artistCover.url}
					alt={songAlbum + ' cover'}
				></img>
			</div>
			<div className='chordbook-container flex'>
				<Chordbook scrollIntoViewRef={scrollRef} />
			</div>
		</div>
	)
}
