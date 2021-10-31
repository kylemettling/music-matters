import axios from 'axios'
import './track.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useTrack } from './hooks'
import { useAppState } from './../state'

export function TrackDetail() {
	const { id } = useParams()
	const [track, setTrack] = useState('')
	const [trackFeatures, setTrackFeatures] = useState({})
	const [artistURL, setArtistURL] = useState('')
	const [artistCover, setArtistCover] = useState('')
	const {
		songTitle,
		songArtist,
		// songLength,
		// songYear,
		songAlbum,
		// artistImage,
		albumCoverURL,
		artistCoverURL,
		setTrackDetails,
	} = useAppState()
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
			const search = await axios.request(options)
			const trackData = await search.data
			setTrack(trackData)
			setTrackDetails(trackData, token)
			console.log(trackData)
		}
		fetchTrack()
		if (track) {
			setArtistURL(track.artists[0].url)
		}
		// console.log(artistURL)
	}

	// GET track audio features
	async function getTrackFeatures() {
		// console.log(artistURL)
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
	}

	async function getArtistDetails() {
		// console.log(track)
		// const options = {
		// 	method: 'GET',
		// 	url: track.artists[0].url,
		// 	headers: {
		// 		Authorization: 'Bearer ' + token,
		// 	},
		// }
		// console.log(options)
		// const fetchArtistDetails = async () => {
		// 	const search = await axios
		// 		.request(options)
		// 		.catch((err) => console.log(err))
		// 	const artistData = search.data
		// 	const artistCoverURL = artistData.images[0]?.url
		// 	console.log(artistCoverURL)
		// 	setArtistCover(artistCoverURL)
		// }
		// fetchArtistDetails()
	}

	useEffect(() => {
		if (!track) {
			getTrack()
			getTrackFeatures()
			// setTrackDetails(track)
		}
		if (track) {
			getArtistDetails()
		}
	}, [])

	if (!track && !artistURL && !trackFeatures) return null
	// if (!track ) return null

	return (
		<div>
			<div className='track-main'>
				<div className='track-card-cover'>
					<div
						className='track-card'
						style={{
							backgroundImage: `url(${artistCoverURL})`,
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
				{JSON.stringify(trackFeatures, null, 4)}
			</div>
		</div>
	)
}
