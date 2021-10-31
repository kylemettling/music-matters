import { useState } from 'react'
import axios from 'axios'

export const useTrack = () => {
	const [track, setTrack] = useState()
	const [songTitle, setSongTitle] = useState('')
	const [songArtist, setSongArtist] = useState('')
	const [songAlbum, setSongAlbum] = useState('')
	const [albumCoverURL, setAlbumCoverURL] = useState('')
	const [artistCoverURL, setArtistCoverURL] = useState('')
	// const [track, setTrack] = useState({})

	const setTrackDetails = (data, token) => {
		// console.log(data.album.images)
		setTrack(data)
		const artistName = data.artists[0].name
		const albumCover = data.album.images[0].url
		// const artistCover = data.artists[0].images[0].url
		// console.log(albumCover)
		setSongTitle(data.name)
		setSongArtist(artistName)
		setSongAlbum(data.album.name)
		// console.log(songTitle, songAlbum, songArtist)
		// const songArtist =
		// const albumURL = albumCover
		// console.log(albumCover[0].url)
		setAlbumCoverURL(albumCover)

		const getArtistCoverURL = (data) => {
			const options = {
				method: 'GET',
				url: data.artists[0].url,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
			console.log('OPTIONS: ', options)
			const fetchArtistDetails = async () => {
				const search = await axios
					.request(options)
					.catch((err) => console.log(err))
				const artistData = await search.data
				const artistCover = artistData.images[0]?.url
				console.log(artistCover)
				setArtistCoverURL(artistCover)
			}
			fetchArtistDetails()
		}
		getArtistCoverURL(data)
		// setArtistCoverURL(artistCover)
		// return { songTitle, songArtist, songAlbum, albumCoverURL }
	}

	// useEffect(() => {}, [albumCoverURL])

	return {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		artistCoverURL,
		setTrackDetails,
	}
}
