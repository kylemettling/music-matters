import React, { Fragment, useState } from 'react'
import './results.css'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import { Track } from './Track'

export function Result({ track, type, searchToggle, token, index }) {
	// const [data, setData] = useState(false);
	useEffect(() => {
		// console.log(results, data)
		// console.log(token);
		// setData(true);
	}, [track, searchToggle, token])

	return (
		<li className='result flex card' key={index}>
			{/* <div className=' flex'> */}
			<div className='text flex'>
				<div className='resultName flex'>
					<h5 className='title'>
						<Link
							to={{
								pathname: `/${type}/${track.key || track.id}`,
								state: { token: token },
							}}
						>
							{track.title || track.name}
						</Link>
					</h5>
					<h5 className='artist'>
						<Link
							to={{
								pathname: `/${type}/${track.key || track.artists[0].id}`,
								state: { token: token },
							}}
						>
							{track.artists[0].name}
						</Link>
					</h5>
				</div>
				<div className='releaseTime flex'>
					<span>
						{new Date(track.duration_ms).getMinutes()}m
						{new Date(track.duration_ms).getSeconds()}s
					</span>
					<span>{track.album.release_date.split('-')[0]}</span>
				</div>
			</div>
			<div>
				<Link to={`/album/${track.key || track.album.id}`}>
					<img
						className='album'
						src={
							track.album.images[0].url ||
							'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
						}
						alt={[track.title || track?.name] + ' cover'}
					/>
				</Link>
			</div>
			{/* </div> */}
		</li>
	)
}
