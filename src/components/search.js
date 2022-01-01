import './search.css'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Results from './results'
import { shazam, spotify } from './config/Connection'
import { useSpotifyToken } from './hooks'
import { useAppState } from '../state'
import chordNotes from './../state/scaleNotes'

export default function Search() {
	const [artistRequest, setArtistRequest] = useState('synchronicity')

	const [searchResult, setSearchResult] = useState([])
	const [searchToggle, setSearchToggle] = useState(false)
	// const [spotifySearchData, setSpotifySearchData] = useState("no data");
	// const [spotifyToken, setSpotifyToken] = useState("");
	const [optionState, setOptionState] = useState('track')
	const [searchQuery, setSearchQuery] = useState('Synchronicity II')

	// token management
	// const [token, { refreshToken, getStoredToken }] = useSpotifyToken()
	const {
		token,
		refreshToken,
		getStoredToken,
		isTrackActive,
		clearTrackData,
		chordNotes,
	} = useAppState()

	// const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	// const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

	async function getSpotifySearchData(e) {
		console.log(token)
		if (!token) {
			refreshToken()
		}
		const res = await axios(
			`https://api.spotify.com/v1/search?q=${searchQuery}&type=${optionState}`,
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
				method: 'GET',
			}
		).catch((err) => {
			console.log(err)
		})
		console.log(res)
		if (!res) {
			refreshToken()
			getSpotifySearchData()
		}
		setSearchToggle(true)
		setSearchResult(res.data)
		// tokenToggle()
	}

	useEffect(() => {
		// setTrack({})
		getStoredToken()
		clearTrackData()
		// console.log('Is track active?', isTrackActive)
		// if (isTrackActive) {
		// 	console.log('Active?', isTrackActive)
		// }
		setOptionState(optionState)
	}, [optionState])

	return (
		<Fragment>
			<div className='searchCon'>
				<h2 className='search-text'>What song is playing?</h2>
				<div className='search'>
					<input
						className='searchInput'
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<select
						className='searchSelect'
						name='search-type'
						id='search-type'
						value={optionState}
						onChange={(e) => setOptionState(e.target.value)}
					>
						<option value='track'>Track</option>
						<option value='artist'>Artist</option>
						<option value='album'>Album</option>
					</select>
					<button
						className='searchButton'
						type='submit'
						onClick={(e) => getSpotifySearchData(e)}
						// onClick={(e) => getResults(e)}
					>
						Fetch!
					</button>
				</div>
				<pre>
					{JSON.stringify(
						chordNotes.filter((el) => el.root === 'F'),
						null,
						4
					)}
				</pre>
				<Results
					resultList={searchResult}
					// searchName={artistRequest}
					searchToggle={searchToggle}
					token={token}
				/>
			</div>
		</Fragment>
	)
}
