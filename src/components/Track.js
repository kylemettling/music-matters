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
		<div className='track-main'>
			{/* <div>{JSON.stringify(track)}</div> */}
			<div className='track-card-cover'>
				<div
					className='track-card'
					style={{ backgroundImage: `url(${track.images.background})` }}
				>
					<div className='track-track-details'>
						<h2>{track.title}</h2>
						<h3>{track.subtitle}</h3>
						{/* <span>Album: {track.url}</span> */}
					</div>
					<div className='track-album-details'>
						<div>
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
						<h3>{track.sections[0].metadata[0].text}</h3>
					</div>
				</div>
			</div>
		</div>
	)
}
