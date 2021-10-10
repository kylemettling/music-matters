import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { shazam, spotify } from './config/Connection'

export function Track() {
	const { id } = useParams()
	const [track, setTrack] = useState({})
	const getTrack = async () => {
		const options = {
			method: 'GET',
			url: shazam.urls.trackDetail,
			params: { key: id, locale: 'en-US' },
			headers: {
				'x-rapidapi-host': shazam.host,
				'x-rapidapi-key': shazam.key,
			},
		}
		axios
			.request(options)
			.then(function (response) {
				console.log(response.data)
				setTrack(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	useEffect(() => {
		getTrack()
	}, [id])

	return (
		<div>
			<div>{id}</div>
			<div>{JSON.stringify(track)}</div>
		</div>
	)
}
