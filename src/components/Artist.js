import axios from 'axios'
import './artist.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'
// import { useartist } from './hooks/useartist'

export function Artist() {
	const { id } = useParams()
	const [artist, setartist] = useState('')
	async function getartist() {
		const options = {
			method: 'GET',
			url: shazam.urls.artistDetail,
			params: { key: id, locale: 'en-US' },
			headers: {
				'x-rapidapi-host': shazam.host,
				'x-rapidapi-key': shazam.key,
			},
		}
		try {
			const search = await axios.request(options)
			console.log(search)
			setartist(search.data)
		} catch (err) {
			console.error(err)
		}
		// console.log(search)
	}

	useEffect(() => {
		getartist()
	}, [id])

	if (!artist.title) return null

	return (
		<div className='artist-main'>
			{/* <div>{JSON.stringify(artist)}</div> */}
			<div className='artist-card-cover'>
				<div
					className='artist-card'
					style={{ backgroundImage: `url(${artist.images.background})` }}
				>
					<div className='artist-artist-details'>
						<h2>
							<div className='artist-text-con'>
								<span className='artist-text bump-text-artist'>
									{artist.title}
								</span>
							</div>
						</h2>
						<div className='artist-text-con'>
							<h3 className='subtitle'>
								<span className='artist-text artist bump-text'>
									{artist.subtitle}
								</span>
							</h3>
						</div>
						{/* <span>Album: {artist.url}</span> */}
					</div>
					<div className='artist-album-details'>
						<div className='artist-text'>
							<img
								className='album-cover'
								src={
									artist.images.coverart
										? artist.images.coverart
										: 'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
								}
								alt={[artist.title] + ' cover'}
							></img>
						</div>
						<div className='album-text-con'>
							<h3>
								<span className=''>{artist.sections[0].metadata[0].text}</span>
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
