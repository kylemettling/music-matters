import React, { useEffect, useState } from 'react'
import { Result } from './Result'
import { Track } from './Track'

export default function Results({ resultList, searchName, searchToggle }) {
	const [tracks, setTracks] = useState([])
	const [artists, setArtists] = useState([])

	useEffect(() => {
		if (searchToggle) {
			const data = resultList['data']
			// console.log(data);
			const resTracks = [...data['tracks']['hits']].map(({ track: res }) => res)
			const resArtists = data['artists']['hits'].map(({ artist: res }) => res)

			setTracks(resTracks)
			setArtists(resArtists)
		}
	}, [searchToggle, resultList])

	return (
		<React.Fragment>
			<div className='resultCon'>
				<Result results={tracks} type='track' search={searchToggle} />
				<Result results={artists} type='artist' search={searchToggle} />
			</div>
		</React.Fragment>
	)
}
