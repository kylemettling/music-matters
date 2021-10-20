import React, { Fragment, useState } from 'react'
import './results.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Track } from './Track'

export function Result({ results, type, searchToggle }) {
	const [data, setData] = useState(false)
	useEffect(() => {
		// console.log(results, data)
		setData(true)
	}, [results, data, searchToggle])

	function togglePlay() {}

	return (
		<div>
			<ul className='item-con'>
				{results &&
					results.map((hit, i) => (
						<li key={i}>
							<div className='item'>
								<span
									key={hit.key}
									className={type === 'track' ? 'track-label' : 'artist-label'}
								>
									{type === 'track' ? 'Tracks' : 'Artists'}
								</span>
								{/* <li className='result-item' key={i}> */}
								<div className='result-item'>
									<div className='name-con'>
										<h3 className='result-title'>
											<Link
												to={`/${type}/${hit.key || hit.id}`}
												track-href={hit.href}
											>
												{hit.title || hit.name}
											</Link>
										</h3>
										<h4 className='result-subtitle'>
											<Link to={`/artist/${hit.key || hit.artists[0].id}`}>
												{hit.artists[0].name}
											</Link>
										</h4>
									</div>{' '}
									<div>
										<span className='duration'>{hit.duration_ms}</span>
										<button className='trackPreview' onClick={togglePlay}>
											{hit.preview_url}
										</button>
									</div>
									<Link to={`/album/${hit.key || hit.album.id}`}>
										{/* {hit.artists[0].name} */}
										<img
											className='result-cover'
											// Shazam image resolver
											// src={
											// 	hit.images?.coverarthq
											// 		? hit.images?.coverarthq ||
											// 		  hit.artists?.images.background
											// 		: hit.avatar
											// 		? hit.avatar
											// 		: 'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
											// }

											src={
												hit.album.images[0].url ||
												'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
											}
											alt={[hit.title || hit?.name] + ' cover'}
										/>
									</Link>
								</div>
								{/* </li> */}
							</div>
						</li>
					))}
			</ul>
			<div className='fill'></div>
		</div>
	)
}
