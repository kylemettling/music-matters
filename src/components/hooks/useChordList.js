import { useState } from 'react'

export const useChordList = () => {
	const [token, setToken] = useState('')
	const [fullChordList, setFullChordList] = useState([])
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

	return { fullChordList }
}
