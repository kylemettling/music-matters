import axios from 'axios'
import './track.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
// import { useTrack } from './hooks/useTrack'

export function Track() {
	const { id } = useParams()
	const [track, setTrack] = useState('')
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

	useEffect(() => {
		getTrack()
	}, [id])

	if (!track.title) return null

	return (
		<div>
			<div>{id}</div>
			<div>{JSON.stringify(track)}</div>
			<div className='track-album-details'>
				<span>Artist: {track.subtitle}</span>
				<span>Album: {track.sections[0].metadata[0].text}</span>
				<span>Album: {track.url}</span>
			</div>
		</div>
	)
}
