import axios from 'axios'
import './track.css'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useTrack } from './hooks'
import { useAppState } from './../state'

export function TrackDetail() {
	const { id } = useParams()
	const [track, setTrack] = useState('')
	const [trackFeatures, setTrackFeatures] = useState({})
	// const [artistURL, setArtistURL] = useState('')
	// const [artistCover, setArtistCover] = useState('')
	// const [artistImageDimensions, setImageDimensions] = useState({
	// 	h: null,
	// 	w: null,
	// })
	// const { token, refreshToken, getStoredToken } = useAppState()
	const [songLyrics, setSongLyrics] = useState({ text: '', footer: '' })
	const {
		songTitle,
		songArtist,
		// songLength,
		// songYear,
		songAlbum,
		// artistImage,
		albumCoverURL,
		artistCover,
		getTrackDetails,
		// getArtistCoverURL,
	} = useAppState()

	// const imageRef = useRef(null);
	const {
		location: {
			state: { token },
		},
	} = useHistory()

	async function getTrack() {
		const options = {
			method: 'GET',
			url: spotify.urls.getTrack + id,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		const fetchTrack = async () => {
			const search = await axios
				.request(options)
				.catch((err) => console.log(err))
			const trackData = await search.data
			// const url = trackData.artists[0].href
			// getArtistCoverURL(url)
			return trackData
		}
		const data = await fetchTrack()
		getTrackDetails(data, token)
	}

	// GET track audio features
	async function getTrackFeatures() {
		const options = {
			method: 'GET',
			url: spotify.urls.getTrackFeatures + id,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		const fetchTrackFeatures = async () => {
			const search = await axios
				.request(options)
				.catch((err) => console.log(err))
			const featureData = await search.data
			setTrackFeatures(featureData)
		}
		fetchTrackFeatures()

		// getSongId(songTitle)
	}

	// GET track lyrics (Shazam only)

	// async function getTrackLyrics() {
	// let searchedSongKey;

	async function getSongId(title) {
		// console.log(songTitle);
		const options = {
			method: 'GET',
			url: shazam.urls.search,
			params: {
				term: title,
				locale: 'en-US',
				offset: '0',
				limit: '15  ',
			},
			headers: {
				'x-rapidapi-host': shazam.host,
				'x-rapidapi-key': shazam.key,
			},
		}
		console.log('title: ', title, options)
		// GET request for searching with songTitle to return key
		const search = await axios
			.request(options)
			.then((res) => res?.data?.tracks?.hits)
			.catch((err) => console.log(err))
		// .then((res) => res.data.tracks.hits)
		// console.log(search)
		const results = [...search]
		console.log('search', results.length)
		const filteredRes = results.filter((song) => {
			console.log(song.track.subtitle, song.track.key)
			console.log(song.track.subtitle === songArtist)
			return song?.track?.subtitle === songArtist ? song?.track?.key : null
		})
		console.log('filtered!', filteredRes)
		getSongLyrics(filteredRes[0]?.track?.key)
	}

	// getSongId()
	// GET request using song key to Shazam for song get-details
	async function getSongLyrics(songId) {
		// console.log(songId)
		const options = {
			method: 'GET',
			url: shazam.urls.trackDetail,
			params: { key: songId, locale: 'en-US' },
			headers: {
				'x-rapidapi-host': shazam.host,
				'x-rapidapi-key': shazam.key,
			},
		}
		console.log('options:', options)
		const lyricSearch = await axios
			.request(options)
			.catch((err) => console.log(err))
		// .then((res) => {
		//   console.log(res);
		//   return res.data?.sections?.filter((section) =>
		//     section?.type === "LYRICS"
		//       ? section
		//       : "Sorry, lyrics for this title are not presently available."
		//   );
		// });
		console.log(lyricSearch)
		const lyrics = lyricSearch?.data?.sections?.filter(
			(section) => section.type === 'LYRICS'
		)[0]
		console.log(lyrics)
		// console.log(lyrics.footer)
		// console.log(sections[0].text);
		// console.log(search);
		setSongLyrics({
			text: lyrics?.text,
			footer: lyrics?.footer,
		})
	}
	// }

	// const onRefChange = useCallback((node) => {
	// 	if (node != null) {
	// 		const height = node.offsetHeight
	// 		const width = node.offsetWidth
	// 		console.log(height, width)
	// 	}
	// }, [])
	useEffect(() => {
		// setSongLyrics({ text: "", footer: "" });
		// getStoredToken()
		setTrack({})
		getTrack()
		getTrackFeatures()
		// console.log(songTitle)
		if (songTitle !== '' && songArtist !== '') {
			console.log('TITLE', songTitle)
			getSongId(songTitle)
		}
		// getSongLyrics(songId)
		// getTrackLyrics()
		// if (artistCover) {
		// 	console.log(artistCover)
		// }
	}, [songTitle, songArtist])

	if (!track && !trackFeatures) return null
	// if (!track ) return null

	return (
		<div>
			<div className='track-main'>
				<div className='track-card-cover'>
					<div
						className='track-card'
						// ref={onRefChange}
						style={{
							backgroundImage: `url(${artistCover.url})`,
							height: `${artistCover.h / 1.25}px`,
							width: `${artistCover.w / 1.25}px`,
						}}
					>
						<div className='track-track-details'>
							<div className='track-text-con'>
								<h2>
									<span className='track-text bump-text-track'>
										{songTitle}
									</span>
								</h2>
							</div>
							<div className='track-text-con'>
								<h3 className='subtitle'>
									<span className='track-text track bump-text'>
										{songArtist}
									</span>
								</h3>
							</div>
						</div>
						<div className='track-album-details'>
							<div className='track-text'>
								<img
									className='album-cover'
									src={albumCoverURL}
									alt={[songAlbum] + ' cover'}
								></img>
							</div>
							<div className='album-text-con'>{songAlbum}</div>
						</div>
					</div>
				</div>
			</div>
			<div className='audio-features'>
				{/* <div>{JSON.stringify(trackFeatures, null, 4)}</div> */}
				<span className='track-key'>Key: {trackFeatures.key}</span>
				<span className='track-mode'>Mode: {trackFeatures.mode}</span>
				<div className='song-lyrics-con'>
					<div className='song-lyrics-text-con'>
						<p className='song-lyrics-text'>
							{JSON.stringify(songLyrics.text)}
						</p>
					</div>
					<div className='song-lyrics-footer'>
						<span>{JSON.stringify(songLyrics.footer)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
