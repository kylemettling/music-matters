import React from 'react'
import { useParams } from 'react-router'

export function Track({ track }) {
	const { id } = useParams()
	function getTitle() {}
	return <div>{id}</div>
}
