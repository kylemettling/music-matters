import React, { useEffect, useState } from 'react'
import { Result } from './Result'
import { Track } from './TrackDetail'

export default function Results({
	resultList,
	searchName,
	searchToggle,
	token,
}) {
	const [tracks, setTracks] = useState([])
	const [artists, setArtists] = useState([])

	useEffect(() => {
		// console.log(token);
		if (searchToggle) {
			// const data = resultList['data']
			// console.log(token);
			const data = resultList['tracks']?.items || []
			// console.log("search data:", data);
			setTracks(data)
			// const resTracks = [...data['tracks']['hits']].map(({ track: res }) => res)
			// const resArtists = data['artists']['hits'].map(({ artist: res }) => res)

			// setTracks(resTracks)
			// setArtists(resArtists)
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
				{/* <Result results={tracks} type="track" search={searchToggle} /> */}
				{/* <Result results={artists} type="artist" search={searchToggle} /> */}
			</div>
		</React.Fragment>
	)
}
