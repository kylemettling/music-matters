import axios from 'axios'
import './track.css'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useTrack, useTrackFeatures } from './hooks'
import { useAppState } from './../state'

export function TrackDetail() {
	const { id } = useParams()
	const [songLyrics, setSongLyrics] = useState({ text: '', footer: '' })
	const {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		artistCover,
		setTrack,
		songKey,
		songMode,
		spotifySongId,
		getStoredToken,
		token,
		refreshToken,
		setTrackFeatures,
		isActiveTrack,
		setIsActiveTrack,
		clearTrackData,
	} = useAppState()

	async function getTrack() {
		if (!songTitle) {
		}
		console.log('token!', token)
		const options = {
			method: 'GET',
			url: spotify.urls.getTrack + id,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		// console.log('get track options', options)
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
		setTrack(data, token)
	}

	// GET track lyrics (Shazam only)
	async function getSongId(title) {
		// console.log(songTitle);
		// console.log(title)
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
		// const search = await axios
		// 	.request(options)
		// 	.then((res) => res?.data?.tracks?.hits)
		// 	.catch((err) => console.log(err))
		// console.log(search)
		// const results = [...search]
		// const filteredRes = results.filter((song) => {
		// 	return song?.track?.subtitle === songArtist ? song?.track?.key : null
		// })
		// console.log('filtered!', filteredRes)

		// getSongLyrics(filteredRes[0]?.track?.key)
	}

	// getSongId()
	// GET request using song key to Shazam for song get-details
	async function getSongLyrics(songId) {
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
		console.log(lyricSearch)
		const lyrics = lyricSearch?.data?.sections?.filter(
			(section) => section.type === 'LYRICS'
		)[0]
		setSongLyrics({
			text: lyrics?.text,
			footer: lyrics?.footer,
		})
	}
	useEffect(() => {
		if (!songTitle) {
			getTrack()
		}
		if (songTitle !== '' && songArtist !== '') {
			getSongId(songTitle)
		}
	}, [songTitle, songArtist])

	if (!songTitle && !songKey) return null
	// if (!track ) return null

	return (
		<div>
			<div className='track-main'>
				<div className='track-card-cover'>
					<div
						className='track-card'
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
				<span className='track-key'>Key: {songKey}</span>
				<span className='track-mode'>Mode: {songMode}</span>
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
