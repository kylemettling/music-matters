import { useState, useEffect } from 'react'
// import { useAppState } from '../../state'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'

export const useTrack = () => {
	const [songTitle, setSongTitle] = useState('')
	const [songArtist, setSongArtist] = useState('')
	const [songAlbum, setSongAlbum] = useState('')
	const [albumCoverURL, setAlbumCoverURL] = useState('')
	// const { token, refreshToken, getStoredToken } = useAppState()

	const [artistCover, setArtistCover] = useState({
		url: '',
		h: '',
		w: '',
	})
	// const {
	// 	location: {
	// 		state: { token },
	// 	},
	// } = useHistory()

	const getTrackDetails = (data, token) => {
		const setTrackDetails = (data) => {
			console.log(data)
			const artistName = data.artists[0].name
			const albumCover = data.album.images[0].url
			const url = data.artists[0].href
			console.log('url: ', url, 'token', token)
			setSongTitle(data.name)
			setSongArtist(artistName)
			setSongAlbum(data.album.name)
			setAlbumCoverURL(albumCover)
			getArtistCoverURL(url, token)
		}
		setTrackDetails(data, token)
	}
	const getArtistCoverURL = (data, token) => {
		// getStoredToken()
		console.log(token)
		const options = {
			method: 'GET',
			url: data,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		}
		const fetchArtistDetails = async () => {
			const search = await axios
				.request(options)
				.catch((err) => console.log(err))
			const artistData = await search.data
			const artistCover = artistData.images[0]
			setArtistCover({
				url: artistCover.url,
				h: artistCover.height,
				w: artistCover.width,
			})
		}
		fetchArtistDetails()
	}
	return {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		artistCover,
		getTrackDetails,
		// getArtistCoverURL,
	}
}
