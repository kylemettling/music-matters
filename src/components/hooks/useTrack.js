import { useState } from 'react'
import { useEffect } from 'react'

export const useTrack = () => {
	const [track, setTrack] = useState({})
	const [songTitle, setSongTitle] = useState({})
	const [songArtist, setSongArtist] = useState({})
	const [songAlbum, setSongAlbum] = useState({})
	// const [track, setTrack] = useState({})

	const setTrackDetails = async (data) => {
		await setTrack(data)
		console.log(data)
		await setSongTitle(track.name)
		console.log(songTitle)
		// setSongArtist(track.artists[0].name)
		setSongAlbum(track.album.name)
		// const songArtist =
		// const songAlbum = track.album.images[0].name
		// return [songTitle, songArtist, songAlbum]
	}

	useEffect(() => {
		// setTrack(track)
		// setSongTitle(track.name)
		// setSongAlbum(track.album.name)
		// setSongArtist(track.artists[0].name)
	}, [])

	return [songTitle, songArtist, songAlbum, { setTrackDetails }]
}
