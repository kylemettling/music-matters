import axios from 'axios'
import './track.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
// import { SpotifyToken } from './SpotifyToken'
// import { useTrack } from './hooks/useTrack'
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

export function Track() {
	const { id } = useParams()
	const [track, setTrack] = useState('')
	// const [spotifyToken, setSpotifyToken] = useState({})
	const [spotifySearchData, setSpotifySearchData] = useState('no data')
	async function getTrack() {
		const options = {
			method: 'GET',
			url: shazam.urls.trackDetail,
			params: { key: id, locale: 'en-US' },
			headers: {
				'x-rapidapi-host': shazam.host,
				'x-rapidapi-key': shazam.key,
			},
		}
		try {
			const search = await axios.request(options)
			console.log(search)
			setTrack(search.data)
		} catch (err) {
			console.error(err)
		}
		// console.log(search)
	}

	async function getSpotifyToken() {
		try {
			const res = await axios('https://accounts.spotify.com/api/token', {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
				},
				data: 'grant_type=client_credentials',
				method: 'POST',
			})
			// console.log(res)
			// setSpotifyToken(res.data.access_token)
			// console.log(spotifyToken)
			getSpotifySearchData(res.data.access_token)
		} catch (err) {
			console.log(err)
		}
	}
	async function getSpotifySearchData(spotifyToken) {
		console.log('token', spotifyToken)
		try {
			const title = 'Synchronicity II'
			const artistData = 'The Police'
			const res = await axios(
				`https://api.spotify.com/v1/search?q=${title}%20artist:${artistData}&type=track`,
				{
					headers: {
						Authorization: 'Bearer ' + spotifyToken,
					},
					method: 'GET',
				}
			)
			// console.log(res)
			setSpotifySearchData(res.data)
			// const options = {
			// 	method: 'GET',
			// 	url: `https://api.spotify.com/v1/${title}?type=track&include_external=audio`,
			// 	headers: {
			// 		Authorization: 'Bearer ' + spotifyToken,
			// 	},
			// }
			// console.log(options)
			// const res = axios.request(options)
			// console.log(res)
		} catch (err) {
			console.log(err)
		}

		// const genreResponse = await axios(
		// 	`https://api.spotify.com/v1/${title}?type=track&include_external=audio`,
		// 	{
		// 		method: 'GET',
		// 		headers: {
		// 			Authorization: 'Bearer ' + spotifyToken,
		// 		},
		// 	}
		// )
		// console.log(genreResponse)
		// setSpotifySearchData(genreResponse)
	}
	useEffect(() => {
		getSpotifyToken()
		getTrack()
	}, [])

	if (!track.title) return null
	// if (!spotifyData) return

	return (
		<div className='track-main'>
			<div className='test'>
				<p>{JSON.stringify(spotifySearchData['tracks']['items'][0])}</p>
			</div>
			<div className='track-card-cover'>
				<div
					className='track-card'
					style={{ backgroundImage: `url(${track.images.background})` }}
				>
					<div className='track-track-details'>
						<h2>
							<div className='track-text-con'>
								<span className='track-text bump-text-track'>
									{track.title}
								</span>
							</div>
						</h2>
						<div className='track-text-con'>
							<h3 className='subtitle'>
								<span className='track-text track bump-text'>
									{track.subtitle}
								</span>
							</h3>
						</div>
						{/* <span>Album: {track.url}</span> */}
					</div>
					<div className='track-album-details'>
						<div className='track-text'>
							<img
								className='album-cover'
								src={
									track.images.coverart
										? track.images.coverart
										: 'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
								}
								alt={[track.title] + ' cover'}
							></img>
						</div>
						<div className='album-text-con'>
							<h3>
								<span className=''>{track.sections[0].metadata[0].text}</span>
							</h3>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h3>SPOTIFY</h3>
				{/* <span>{spotifySearchData}</span> */}
			</div>
		</div>
	)
}
