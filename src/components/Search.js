import './search.css'
import './style.css'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Results from './Results'
import { shazam, spotify } from './config/Connection'
import { useSpotifyToken } from './hooks'
import { useAppState } from '../state'
import chordNotes from '../state/scaleNotes'

export default function Search() {
	const [artistRequest, setArtistRequest] = useState('synchronicity')

	const [searchResult, setSearchResult] = useState('')
	const [searchToggle, setSearchToggle] = useState(false)
	const [optionState, setOptionState] = useState('track')
	const [searchQuery, setSearchQuery] = useState('')

	// token management
	// const [token, { refreshToken, getStoredToken }] = useSpotifyToken()
	const {
		token,
		refreshToken,
		getStoredToken,
		isTrackActive,
		clearTrackData,
		getScaleChords,
	} = useAppState()

	// const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	// const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

	async function getSpotifySearchData(e) {
		if (!searchQuery) {
			return
		}

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
			if (err.status === 401) {
				refreshToken()
				getSpotifySearchData()
			}
			console.log('Error!!', err)
		})
		console.log('After request!!', res)
		if (!res) {
			refreshToken()
			getSpotifySearchData()
		}
		setSearchToggle(true)
		setSearchResult(res.data)
	}

	useEffect(() => {
		getStoredToken()
		clearTrackData()
		setOptionState(optionState)
	}, [optionState])

	return (
		<Fragment>
			<div className='main flex'>
				<h2>What song is playing?</h2>
				<div>
					<input
						type='text'
						placeholder='enter track, artist, or album'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<select
						name='search-type'
						id='search-type'
						value={optionState}
						onChange={(e) => setOptionState(e.target.value)}
					>
						<option value='track'>Track</option>
						<option value='artist'>Artist</option>
						<option value='album'>Album</option>
					</select>
					<button type='submit' onClick={(e) => getSpotifySearchData(e)}>
						Fetch!
					</button>
				</div>
				<Results
					resultList={searchResult}
					searchToggle={searchToggle}
					token={token}
				/>
			</div>
		</Fragment>
	)
}
