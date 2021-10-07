import React from 'react'
import './results.css'
import { useEffect } from 'react'

export function Result({ results }) {
	useEffect(() => {
		console.log(results)
	}, [results])

	return (
		<div className='item-con'>
			{results &&
				results.map((hit) => (
					<ul className='result-item'>
						<div>
							<h3 className='result-title' key={hit.id || hit.key}>
								{hit.title || hit.name}
							</h3>
							<h4 className='result-subtitle'>{hit.subtitle || hit.name}</h4>
						</div>
						<img
							className='result-cover'
							src={
								hit.images?.background
									? hit.images?.background || hit.artists?.images.background
									: hit.avatar
									? hit.avatar
									: 'https://is5-ssl.mzstatic.com/image/thumb/Features115/v4/cc/62/0c/cc620ccb-c10d-c538-ce73-06cf185b3303/mzl.ynbraxen.jpg/800x800cc.jpg'
							}
							alt={[hit.title || hit?.name] + ' cover'}
						></img>
					</ul>
				))}
		</div>
	)
}
