import React, { useEffect, useState } from 'react'
import { Result } from './Result'
import './results.css'

export default function Results({ resultList, searchToggle, token }) {
	const [tracks, setTracks] = useState([])
	const [artists, setArtists] = useState([])

	useEffect(() => {
		if (searchToggle) {
			const data = resultList['tracks']?.items || []
			setTracks(data)
		}
	}, [searchToggle, resultList])

	if (!resultList) return null

	return (
		<React.Fragment>
			<div className='results'>
				{tracks &&
					tracks.map((track, i) => (
						<Result
							key={i}
							track={track}
							type='track'
							search={searchToggle}
							token={token}
						/>
					))}
			</div>
		</React.Fragment>
	)
}
