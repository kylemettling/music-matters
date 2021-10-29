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
	const [artistDetails, setArtistDetails] = useState({})
	// const [trackAlbum, setTrackAlbum] = useState('')
	// const [trackArtist, setTrackArtist] = useState('')
	// const [trackTitle, setTrackTitle] = useState('')
	// const [albumCover, setAlbumCover] = useState('')
	const [artistCover, setArtistCover] = useState('')
	const {
		songTitle,
		songArtist,
		// songLength,
		// songYear,
		songAlbum,
		// artistImage,
		albumCoverURL,
		// artistCoverURL,
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
		const search = await axios.request(options)
		const trackData = await search.data
		// console.log(trackData)
		await setTrack(trackData)
		await setTrackDetails(trackData)
		// if (track) {
		// getTrackFeatures()
		// }
		// getTrackFeatures()
		// setArtistImageURL(trackData.artists[0].href)
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
		const search = await axios.request(options).catch((err) => console.log(err))
		const featureData = await search.data
		await setTrackFeatures(featureData)
		// console.log('Track features ready:', featureData)
		// try {
		// 	const search = await axios.request(options)
		// 	const featureData = await search.data
		// 	setTrackFeatures(featureData)
		// 	console.log('Artist detail ready:', track.artists)
		// } catch (err) {
		// 	console.error(err)
		// }

		// getArtistDetails()
	}

	async function getArtistDetails() {
		const options = {
			method: 'GET',
			url: track.artists[0]?.href || track.artists.href,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		// console.log(options)
		const search = await axios.request(options).catch((err) => console.log(err))
		const artistData = await search.data
		// console.log('ARTIST DATA', artistData.images[0].url)
		setArtistDetails(artistData)
		setArtistCover(artistDetails.images[0].url)
		// console.log(songTitle, songArtist, songAlbum, albumCoverURL)
		// setArtistImageURL
		// console.log('Artist detail ready:', track)
		// try {
		// 	const search = await axios.request(options)
		// 	const artistData = await search.data
		// 	setArtistDetails(artistData)
		// } catch (err) {
		// 	console.log(err)
		// }
	}

	useEffect(() => {
		if (!track) {
			getTrack()
		}
		if (track) {
			getTrackFeatures()
			getArtistDetails()
			setTrackDetails(track)
			// setUseTrack(track)
		}
		if (track && artistDetails) {
			// console.log(trackFeatures)
			// console.log(artistDetails)
			// console.log(artistDetails.images[0].url)
			// setArtistCover(artistDetails?.images[0]?.url)
			// console.log(trackTitle, trackArtist)
		}
		// console.log(songTitle, songArtist, songAlbum, albumCoverURL)
		// if (albumCoverURL) {
		// 	console.log(albumCoverURL)
		// }
	}, [])

	if (!track && !artistDetails && !trackFeatures) return null
	// if (!track ) return null

	return (
		<div>
			<div className='track-main'>
				{/* <div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>{songTitle}</span>
				<span>{songArtist}</span>
				<span>{songAlbum}</span>


				<AlbumCover />
			</div> */}
				{/* <span>{songAlbum}</span> */}
				{/* <span>{songArtist}</span> */}
				{/* <span>{albumCoverURL}</span>
			<span>{artistImageURL}</span> */}
				<div className='track-card-cover'>
					<div
						className='track-card'
						style={{
							backgroundImage: `url(${artistCover})`,
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
			<div className='audio-features'>{JSON.stringify(trackFeatures)}</div>
		</div>
	)
}
