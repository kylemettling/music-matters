import axios from 'axios'
import './track.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export function Track() {
	const { id } = useParams()
	const [track, setTrack] = useState('')
	const [trackFeatures, setTrackFeatures] = useState({})
	const [artistDetails, setArtistDetails] = useState({})
	const [artistImageURL, setArtistImageURL] = useState('')
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
		setTrack(trackData)
		getTrackFeatures()
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
		setTrackFeatures(featureData)
		console.log('Artist detail ready:', track.artists)
		// try {
		// 	const search = await axios.request(options)
		// 	const featureData = await search.data
		// 	setTrackFeatures(featureData)
		// 	console.log('Artist detail ready:', track.artists)
		// } catch (err) {
		// 	console.error(err)
		// }

		getArtistDetails()
	}

	async function getArtistDetails() {
		// console.log(track.artists);
		// console.log('DETAILS', trackFeatures, artistImageURL, track.artists)
		// console.log('IMAGE URL:', artistImageURL)
		const options = {
			method: 'GET',
			// url: artistImageURL,
			url: track.artists[0].href,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		const search = await axios.request(options).catch((err) => console.log(err))
		// console.log(search)
		const artistData = await search.data
		console.log('ARTIST DATA', artistData)
		setArtistDetails(artistData)
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
		// if (id) {
		// 	getTrack()
		// }
		// Promise.all([getTrack(), getTrackFeatures(), getArtistDetails()])
		getTrack()
		// if (track) {
		// 	getTrackFeatures()
		// }
	}, [])

	if (!track && !artistDetails) return null

	return (
		<div className='track-main'>
			<div className='track-card-cover'>
				<div
					className='track-card'
					// style={{
					// 	backgroundImage: `url(${
					// 		artistDetails.images[0].url || artistDetails.images.url
					// 	})`,
					// }}
				>
					<div className='track-track-details'>
						<div className='track-text-con'>
							<h2>
								<span className='track-text bump-text-track'>{track.name}</span>
							</h2>
						</div>
						<div className='track-text-con'>
							<h3 className='subtitle'>
								<span className='track-text track bump-text'>
									{track.artists[0]?.name}
								</span>
							</h3>
						</div>
					</div>
					<div className='track-album-details'>
						<div className='track-text'>
							<img
								className='album-cover'
								src={
									track.album.images[0]?.url
										? track.album.images[0]?.url
										: 'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
								}
								alt={[track.name] + ' cover'}
							></img>
						</div>
						<div className='album-text-con'>
							{/* <h3>
								<span className=''>{track.sections[0].metadata[0].text}</span>
							</h3> */}
						</div>
					</div>
				</div>
			</div>
			<div>
				<h3>{JSON.stringify(artistDetails)}</h3>
			</div>
		</div>
	)
}
