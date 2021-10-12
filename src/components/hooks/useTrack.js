import { useState } from 'react'

export const useTrack = (track) => {
	console.log(track)
	const [title, setTitle] = useState('')
	const [artist, setArtist] = useState('')
	const [album, setAlbum] = useState('')
	const [year, setYear] = useState('')
	const [background, setBackground] = useState('')
	const [cover, setCover] = useState('')

	setAlbum(track.sections[0].metadata[0].text)
	setYear(track.sections[0].metadata[2].text)
	setBackground(track.sections[0].metapages[0].image)
	setCover(track.sections[0].metapages[0].image)

	return { title, artist, album, year, background, cover }
}
