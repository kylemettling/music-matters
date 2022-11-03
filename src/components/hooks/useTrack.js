import { useState, useEffect } from 'react'
import { useAppState } from '../../state'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { spotify } from '../config/Connection'
import axios from 'axios'

export const useTrack = () => {
	const [isActiveTrack, setIsActiveTrack] = useState(false)
	const [songTitle, setSongTitle] = useState('')
	const [songArtist, setSongArtist] = useState('')
	const [songAlbum, setSongAlbum] = useState('')
	const [songKey, setSongKey] = useState('')
	const [songMode, setSongMode] = useState('')

	const [spotifySongId, setSpotifySongId] = useState('')
	const [albumCoverURL, setAlbumCoverURL] = useState('')
	const [artistURL, setArtistURL] = useState('')
	const { token, refreshToken, getStoredToken } = useAppState()

	const [artistCover, setArtistCover] = useState({
		url: '',
		h: '',
		w: '',
	})
	const history = useHistory()
	function setTrackFeatures(data) {
		setSongKey(data.key)
		setSongMode(data.mode)
	}

	async function getTrackFeatures(id, token) {
		if (id !== '' && token !== '') {
			const options = {
				method: 'GET',
				url: spotify.urls.getTrackFeatures + id,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
			console.log('GET TRACK FEATURES ID:', id)
			const fetchTrackFeatures = async () => {
				const search = await axios
					.request(options)
					.catch((err) => console.log(err))
				const featureData = await search.data
				setTrackFeatures(featureData)
			}
			fetchTrackFeatures()
		}
	}
	// const getTrackDetails = (data) => {
	const setTrack = (data, token) => {
		const artistName = data.artists[0].name
		const albumCover = data.album.images[0].url
		const url = data.artists[0].href
		setSpotifySongId(data.id)
		setSongTitle(data.name)
		setSongArtist(artistName)
		setSongAlbum(data.album.name)
		setAlbumCoverURL(albumCover)
		setArtistURL(url)
		getArtistCoverURL(url, token)
		getTrackFeatures(data.id, token)
		setIsActiveTrack(true)

		// localStorage.setItem('trackId')
	}
	const getArtistCoverURL = (data, token) => {
		if (data !== '' && token !== '') {
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
	}

	const getStoredTrack = () => {
		const path = window.location.pathname.split('/')
		const currentTrackId = path[path.length - 1]
		console.log(currentTrackId)
		const storedTrackId = localStorage.getItem('trackId')
		const storedArtistId = localStorage.getItem('artistId')
		if (currentTrackId === storedTrackId) {
			// setTrack()
		}
		// if(spotifySongId === history.location.pathname)
	}

	const clearTrackData = () => {
		setIsActiveTrack(false)
		setSpotifySongId('')
		setSongTitle('')
		setSongArtist('')
		setSongAlbum('')
		setAlbumCoverURL('')
		getArtistCoverURL('', '')
		getTrackFeatures('', '')
		setSongKey('')
		setSongMode('')
	}
	return {
		songTitle,
		songArtist,
		songAlbum,
		songKey,
		songMode,
		spotifySongId,
		albumCoverURL,
		artistCover,
		setTrack,
		isActiveTrack,
		clearTrackData,
		getStoredTrack,
	}
}
