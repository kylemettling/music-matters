import './search.css'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Results from './results'
import { shazam, spotify } from './config/Connection'

export default function Search() {
	const [artistRequest, setArtistRequest] = useState('synchronicity')

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

				if (!res) {
					localStorage.removeItem('spotifyToken')
					getSpotifyToken()
				}

				localStorage.setItem('spotifyToken', res.data.access_token)
				setSpotifyToken(res.data.access_token)
			} catch (err) {
				console.log(err)
			}
		}
	}
	async function getSpotifySearchData() {
		//  {
		getSpotifyToken()
		// 	console.log('TOKEN TIME!', spotifyToken)
		// }
		// console.log("token", spotifyToken);
		// const title = "Synchronicity II";
		// const artistData = "The Police";
		// ${artistRequest ? artistRequest + '%20artist:' : ''}
		console.log(spotifyToken, searchQuery, optionState)
		// try {
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

		// getSpotifyToken()

		// .then((data) => {
		// 	if (!data) {
		// 		localStorage.removeItem('spotifyToken')
		// 		getSpotifyToken()
		// 	}
		// })

		// setSpotifySearchData(res.data)
		setSearchResult(res.data)
		setSearchToggle(true)

		// } catch (err) {
		// console.log(res)

		// console.log(err)
		// }

		// try {
		//   const search = await axios.request(options);
		//   console.log(search);
		//   setResult(search);
		//   setSearchToggle(true);
		// } catch (err) {
		//   console.error(err);
		// }
	}

	// function getStoredToken() {
	//   const
	// }
	// async function getResults(e) {
	// console.log(artistRequest)

	// Shazam search options
	// const options = {
	//   method: "GET",
	//   url: shazam.urls.search,
	//   params: {
	//     term: artistRequest,
	//     locale: "en-US",
	//     offset: "0",
	//     limit: "5",
	//   },
	//   headers: {
	//     "x-rapidapi-host": `${shazam.host}`,
	//     "x-rapidapi-key": `${shazam.key}`,
	//   },
	// };

	// Spotify search options
	// const options = {
	//   method: "GET",
	//   url: spotify.urls.search,
	//   params: {
	//     term: artistRequest,
	//     locale: "en-US",
	//     offset: "0",
	//     limit: "5",
	//   },
	//   headers: {
	//     "x-rapidapi-host": `${shazam.host}`,
	//     "x-rapidapi-key": `${shazam.key}`,
	//   },
	// };

	useEffect(() => {
		// getStoredToken()

		setSpotifyToken(localStorage.getItem('spotifyToken') || getSpotifyToken())
		console.log(spotifyToken)
		setOptionState(optionState)
		// console.log('TOKEN ON LOAD:', spotifyToken, optionState)
		// console.log(spotifyToken)
	}, [spotifyToken, optionState])

	return (
		<Fragment>
			<div className='searchCon'>
				<h2>What song are you playing?</h2>
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
					searchToggle={searchToggle}
				/>
			</div>
		</Fragment>
	)
}
