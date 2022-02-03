import React, { Fragment, useState } from 'react'
// import "./results.css";
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
		<div class='resultItem'>
			<ul className='item-con'>
				{track && (
					<li key={key}>
						<div className='item'>
							<div className='result-item'>
								<div className='name-con'>
									<div className='name-artist'>
										<h3 className='result-title'>
											<Link
												to={{
													pathname: `/${type}/${track.key || track.id}`,
													state: { token: token },
												}}
											>
												{track.title || track.name}
											</Link>
										</h3>
										<h4 className='result-subtitle'>
											<Link
												to={{
													pathname: `/${type}/${
														track.key || track.artists[0].id
													}`,
													state: { token: token },
												}}
											>
												{track.artists[0].name}
											</Link>
										</h4>
									</div>
									<div className='detail-con'>
										<span className='detail-release'>
											{track.album.release_date.split('-')[0]}
										</span>
										<span>
											{new Date(track.duration_ms).getMinutes()}m
											{new Date(track.duration_ms).getSeconds()}s
										</span>
									</div>
								</div>{' '}
								<div></div>
								<Link to={`/album/${track.key || track.album.id}`}>
									<img
										className='result-cover'
										// Shazam image resolver
										// src={
										// 	track.images?.coverarthq
										// 		? track.images?.coverarthq ||
										// 		  track.artists?.images.background
										// 		: track.avatar
										// 		? track.avatar
										// 		: 'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
										// }

										src={
											track.album.images[0].url ||
											'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
										}
										alt={[track.title || track?.name] + ' cover'}
									/>
								</Link>
							</div>
						</div>
					</li>
				)}
			</ul>
			{/* <div className='fill'></div> */}
		</div>
	)
}
