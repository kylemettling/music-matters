import React, { Fragment, useState } from 'react'
import './results.css'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import { Track } from './Track'

export function Result({ track, type, searchToggle, token, key }) {
	// const [data, setData] = useState(false);
	useEffect(() => {
		// console.log(results, data)
		// console.log(token);
		// setData(true);
	}, [track, searchToggle, token])

	return (
		<div className='result'>
			{track && (
				// <li key={key}>
				<div>
					<div className='flex'>
						<div>
							<h3>
								<Link
									to={{
										pathname: `/${type}/${track.key || track.id}`,
										state: { token: token },
									}}
								>
									{track.title || track.name}
								</Link>
							</h3>
							<h4>
								<Link
									to={{
										pathname: `/${type}/${track.key || track.artists[0].id}`,
										state: { token: token },
									}}
								>
									{track.artists[0].name}
								</Link>
							</h4>
						</div>
						<div>
							<span>{track.album.release_date.split('-')[0]}</span>
							<span>
								{new Date(track.duration_ms).getMinutes()}m
								{new Date(track.duration_ms).getSeconds()}s
							</span>
						</div>
					</div>
					<Link to={`/album/${track.key || track.album.id}`}>
						<img
							src={
								track.album.images[0].url ||
								'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
							}
							alt={[track.title || track?.name] + ' cover'}
						/>
					</Link>
				</div>
			)}
		</div>
	)
}
