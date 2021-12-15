import './search.css'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Results from './results'
import { shazam, spotify } from './config/Connection'

export default function Search() {
	// const [artistRequest, setArtistRequest] = useState("synchronicity");

	const [searchResult, setSearchResult] = useState([])
	const [searchToggle, setSearchToggle] = useState(false)
	const [spotifySearchData, setSpotifySearchData] = useState('no data')
	const [spotifyToken, setSpotifyToken] = useState(undefined)
	const [optionState, setOptionState] = useState('track')
	// const [spotifyToken, setSpotifyToken] = useState("");
	const [searchQuery, setSearchQuery] = useState('Synchronicity II')

	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

	// async function getSongDetails(song) {
	// 	var options = {
	// 		method: 'GET',
	// 		url: 'https://shazam.p.rapidapi.com/songs/get-details',
	// 		params: { key: '40333609', locale: 'en-US' },
	// 		headers: {
	// 			'x-rapidapi-host': `${API_HOST}`,
	// 			'x-rapidapi-key': `${API_KEY}`,
	// 		},
	// 	}

	// 	axios
	// 		.request(options)
	// 		.then(function (response) {
	// 			console.log(response.data)
	// 		})
	// 		.catch(function (error) {
	// 			console.error(error)
	// 		})
	// }
	async function getSpotifyToken() {
		if (!spotifyToken) {
			try {
				const res = await axios('https://accounts.spotify.com/api/token', {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
					},
					data: 'grant_type=client_credentials',
					method: 'POST',
				})
				// getSpotifySearchData()

				localStorage.setItem('spotifyToken', res.data.access_token)
				setSpotifyToken(res.data.access_token)
			} catch (err) {
				console.log(err)
			}
		}
	}
	async function getSpotifySearchData() {
		const res = await axios(
			`https://api.spotify.com/v1/search?q=${searchQuery}&type=${optionState}`,
			{
				headers: {
					Authorization: 'Bearer ' + spotifyToken,
				},
				method: 'GET',
			}
		).catch((err) => {
			console.log(err)
		})
		if (!res) {
			localStorage.removeItem('spotifyToken')
			getSpotifyToken()
		}

		setSearchToggle(true)
		setSearchResult(res.data)
	}

	useEffect(() => {
		// if no token value, get localStorage item or call the getSpotifyToken function
		if (!spotifyToken) {
			setSpotifyToken(localStorage.getItem('spotifyToken') || getSpotifyToken)
			console.log(spotifyToken)
		}

		// set the value to state for select option
		setOptionState(optionState)
	}, [spotifyToken, optionState])

	return (
		<Fragment>
			<div className='searchCon'>
				<h2 className='search-text'>What song are you playing?</h2>
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
				<Results
					resultList={searchResult}
					// searchName={artistRequest}
					spotifyToken={spotifyToken}
					searchToggle={searchToggle}
				/>
			</div>
		</Fragment>
	)
}
