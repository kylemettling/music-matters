import React, { useEffect, useState } from 'react'
import { spotify } from './config/Connection'
import { Result } from './Result'
import { Track } from './Track'

export default function Results({
	resultList,
	searchName,
	searchToggle,
	spotifyToken,
}) {
	const [tracks, setTracks] = useState([])
	const [artists, setArtists] = useState([])

	useEffect(() => {
		if (searchToggle) {
			// const data = resultList['data']
			const data = resultList['tracks']?.items || []
			setTracks(data)
			console.log('search data:', tracks)
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
					spotifytoken={spotifyToken}
					type='track'
					search={searchToggle}
				/>
				{/* <Result results={tracks} type="track" search={searchToggle} /> */}
				{/* <Result results={artists} type="artist" search={searchToggle} /> */}
			</div>
		</React.Fragment>
	)
}
