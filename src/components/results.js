import React, { useEffect, useState } from 'react'
import { Result } from './Result'

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
			<div className='resultCon'>
				<Result
					results={tracks}
					type='track'
					search={searchToggle}
					token={token}
				/>
			</div>
		</React.Fragment>
	)
}
