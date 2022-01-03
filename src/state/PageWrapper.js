import React, { createContext, useContext } from 'react'
import { useSpotifyToken, useTrack, useScaleChords } from '../components/hooks'
// import scaleNotes from './scaleNotes'
// import scaleChordStructure from './scaleChordStructure'

export const AppContext = createContext({})

export const PageWrapper = ({ children }) => {
	const { token, refreshToken, getStoredToken } = useSpotifyToken()
	const { getScaleChords } = useScaleChords()
	// const notes = scaleNotes
	// const chordStructure = scaleChordStructure
	const {
		songTitle,
		songArtist,
		songAlbum,
		songKey,
		songKeyCenterQuality,
		spotifySongId,
		albumCoverURL,
		artistCover,
		setTrack,
		isActiveTrack,
		clearTrackData,
	} = useTrack()
	return (
		<AppContext.Provider
			value={{
				token,
				refreshToken,
				getStoredToken,
				songTitle,
				songArtist,
				songAlbum,
				songKey,
				songKeyCenterQuality,
				spotifySongId,
				albumCoverURL,
				artistCover,
				setTrack,
				isActiveTrack,
				clearTrackData,
				// scaleNotes,
				getScaleChords,
				// scaleChordStructure,
				// notes,
				// chordStructure,
				// setTrackFeatures,
				// getArtistCoverURL,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppState = () => useContext(AppContext)
