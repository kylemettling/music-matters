import { useState } from 'react'
import { useEffect } from 'react'

export const useTrack = () => {
	const [track, setTrack] = useState()
	const [songTitle, setSongTitle] = useState('')
	const [songArtist, setSongArtist] = useState('')
	const [songAlbum, setSongAlbum] = useState('')
	const [albumCoverURL, setAlbumCoverURL] = useState('')
	// const [track, setTrack] = useState({})

	const setTrackDetails = (data) => {
		// console.log(data.album.images)
		setTrack(data)
		const artistName = data.artists[0].name
		const albumCover = { ...data.album.images }
		// console.log(albumCover)
		setSongTitle(data.name)
		setSongArtist(artistName)
		setSongAlbum(data.album.name)
		// console.log(songTitle, songAlbum, songArtist)
		// const songArtist =
		const albumURL = albumCover[0].url
		console.log(albumCover[0].url)
		setAlbumCoverURL(albumURL)
		// return { songTitle, songArtist, songAlbum, albumCoverURL }
	}

	// useEffect(() => {}, [albumCoverURL])

	return { songTitle, songArtist, songAlbum, albumCoverURL, setTrackDetails }
}
