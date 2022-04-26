import axios from 'axios'
import { useState } from 'react'

export const useSpotifyToken = () => {
	const [token, setToken] = useState('')
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

	const refreshToken = async () => {
		const options = {
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
			},
			data: 'grant_type=client_credentials',
			method: 'POST',
		}
		console.log('Options:', options)
		const search = await axios.request(options).catch((err) => console.log(err))
		console.log('Search:', search)
		const newToken = await search?.data?.access_token
		setToken(newToken)
	}

	const getStoredToken = () => {
		const storedToken = localStorage.getItem('spotifyToken') || ''
		if (!storedToken) {
			refreshToken()
		}
		setToken(storedToken)
	}

	return { token, refreshToken, getStoredToken, setToken }
}
