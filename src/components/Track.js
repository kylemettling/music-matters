import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router'

export function Track() {
	const { id } = useParams()
	const [track, setTrack] = useState({})
	const getTrack = async () => {
		try {
			const res = await axios.get()
			// const newTrack =
			setTrack(res)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div>
			<div>{id}</div>
			<div>{JSON.stringify(track)}</div>
		</div>
	)
}
