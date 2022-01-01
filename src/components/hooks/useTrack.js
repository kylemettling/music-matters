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
	const [artistURL, setArtistURL] = useState('')
	const [isStoredTrack, setIsStoredTrack] = useState(false)
	const { token, refreshToken, getStoredToken } = useAppState()

	const [artistCover, setArtistCover] = useState({
		url: '',
		h: '',
		w: '',
	})
	const history = useHistory()
	function setTrackFeatures(data) {
		setSongKey(data.key)
		setKeyCenterQuality(data.mode)
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
		artistURL,
		artistCover,
		setTrack,
		isStoredTrack,
		isActiveTrack,
		clearTrackData,
	}
}
