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
	const [songKeyCenterQuality, setKeyCenterQuality] = useState('')

	const [spotifySongId, setSpotifySongId] = useState('')
	const [albumCoverURL, setAlbumCoverURL] = useState('')
	// const [artistURL, setArtistURL] = useState('')
	const [isStoredTrack, setIsStoredTrack] = useState(false)
	const { token, refreshToken, getStoredToken } = useAppState()

	const [artistCover, setArtistCover] = useState({
		url: '',
		h: '',
		w: '',
	})
	// const history = useHistory()

	async function getTrackFeatures(id, token) {
		if (id !== '' && token !== '') {
			const options = {
				method: 'GET',
				url: spotify.urls.getTrackFeatures + id,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
			// console.log('GET TRACK FEATURES ID:', id)
			const fetchTrackFeatures = async () => {
				const search = await axios
					.request(options)
					.catch((err) => console.log(err))

				// if (!search) {
				// 	refreshToken()
				// 	getTrackFeatures(id, token)
				// }

				const featureData = await search.data
				// setTrackFeatures(featureData)

				// console.log(featureData.key, featureData.mode);
				setSongKey(featureData.key)
				setKeyCenterQuality(featureData.mode)
			}
			fetchTrackFeatures()
			storeTrack()
			// setIsActiveTrack(true)
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
		// setArtistURL(url);
		// console.log('Arist URL:', url)
		// getArtistCoverURL(url, token)
		// getTrackFeatures(data.id, token)
		// if (artistCover !== '' && songKeyCenterQuality !== '') {
		// setIsActiveTrack(true)
		// }
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
			// setIsActiveTrack(true)
		}
	}

	const storeTrack = () => {
		localStorage.setItem('songTitle', songTitle)
		localStorage.setItem('songArtist', songArtist)
		localStorage.setItem('songAlbum', songAlbum)
		localStorage.setItem('songKey', songKey)
		localStorage.setItem('songMode', songKeyCenterQuality)
		localStorage.setItem('spotifySongId', spotifySongId)
		localStorage.setItem('albumCoverURL', albumCoverURL)
		localStorage.setItem('artistURL', artistCover.url)
		// console.log('STORAGE!', localStorage)
		setIsActiveTrack(true)
	}

	const clearTrackData = () => {
		setSpotifySongId('')
		setSongTitle('')
		setSongArtist('')
		setSongAlbum('')
		setAlbumCoverURL('')
		getArtistCoverURL('', '')
		getTrackFeatures('', '')
		setSongKey('')
		setKeyCenterQuality('')
		setIsActiveTrack(false)
	}
	return {
		songTitle,
		songArtist,
		songAlbum,
		songKey,
		songKeyCenterQuality,
		spotifySongId,
		albumCoverURL,
		// artistURL,
		artistCover,
		setTrack,
		isStoredTrack,
		isActiveTrack,
		clearTrackData,
		setIsActiveTrack,
		getTrackFeatures,
		getArtistCoverURL,
	}
}
