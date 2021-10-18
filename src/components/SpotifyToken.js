import axios from 'axios'
import { useState, useEffect } from 'react'
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

export function SpotifyToken() {
	const [response, setResponse] = useState('no reponse')
	useEffect(() => {
		getSpotifyData()
	}, [response])
	async function getSpotifyData() {
		const res = await axios('https://accounts.spotify.com/api/token', {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
			},
			data: 'grant_type=client_credentials',
			method: 'POST',
		})
		const genreResponse = await axios(
			'https://api.spotify.com/v1/browse/categories?locale=sv_US',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + res.data.access_token },
			}
		)
			.then((genreResponse) => {
				// console.log(genreResponse, response)
				setResponse(genreResponse)
			})
			.catch((e) => console.log(e))
	}

	return <div>LOL{JSON.stringify(response)}</div>
}
