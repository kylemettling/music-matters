import './search.css'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Results from './results'
import { shazam, spotify } from './config/Connection'

export default function Search() {
	const [artistRequest, setArtistRequest] = useState('synchronicity')

	const [result, setResult] = useState(false)
	const [searchToggle, setSearchToggle] = useState(false)

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

	async function getResults(e) {
		console.log(artistRequest)
		const options = {
			method: 'GET',
			url: shazam.urls.search,
			params: {
				term: artistRequest,
				locale: 'en-US',
				offset: '0',
				limit: '5',
			},
			headers: {
				'x-rapidapi-host': `${shazam.host}`,
				'x-rapidapi-key': `${shazam.key}`,
			},
		}
		console.log(options)
		// const options = {
		// 	method: 'GET',
		// 	url: 'https://songstats.p.rapidapi.com/tracks/info',
		// 	params: {
		// 		spotify_track_id: '3VTPi12rK7mioSLL0mmu75',
		// 		songstats_track_id: '2iye8blt',
		// 		isrc: 'GBKQU2166610',
		// 	},
		// 	headers: {
		// 		'x-rapidapi-host': 'songstats.p.rapidapi.com',
		// 		'x-rapidapi-key': `${API_KEY}`,
		// 	},
		// }

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})

		try {
			const search = await axios.request(options)
			console.log(search)
			setResult(search)
			setSearchToggle(true)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<Fragment>
			<div className='searchCon'>
				<h2>What song are you playing?</h2>
				<div className='search'>
					<input
						className='searchInput'
						type='text'
						value={artistRequest}
						onChange={(e) => setArtistRequest(e.target.value)}
					/>
					<button
						className='searchButton'
						type='submit'
						// onClick={(e) => getSongDetails(e)}
						onClick={(e) => getResults(e)}
						// onClick={(e) => processResults(e)}
					>
						Fetch!
					</button>
				</div>
				<Results
					resultList={result}
					searchName={artistRequest}
					searchToggle={searchToggle}
				/>
			</div>
		</Fragment>
	)
}
