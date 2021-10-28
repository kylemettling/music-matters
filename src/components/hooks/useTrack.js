import { useState } from 'react'
import { useEffect } from 'react'

export const useTrack = () => {
	const [track, setTrack] = useState()
	const [songTitle, setSongTitle] = useState('')
	const [songArtist, setSongArtist] = useState('')
	const [songAlbum, setSongAlbum] = useState('')
	const [albumCoverURL, setAlbumCoverURL] = useState('')
	const [artistCoverURL, setArtistCoverURL] = useState('')
	// const [track, setTrack] = useState({})

	const setTrackDetails = (data) => {
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
		// setArtistCoverURL(artistCover)
		// return { songTitle, songArtist, songAlbum, albumCoverURL }
	}

	// useEffect(() => {}, [albumCoverURL])

	return {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		// artistCoverURL,
		setTrackDetails,
	}
}
