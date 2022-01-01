import React, { createContext, useContext } from 'react'
import { useSpotifyToken, useTrack } from '../components/hooks'
import chordNotes from './scaleNotes'
// import { chordNotes } from 'state'

export const AppContext = createContext({})

export const PageWrapper = ({ children }) => {
	const { token, refreshToken, getStoredToken } = useSpotifyToken()
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
	// const {chordNotes} = chordNotes
	// const scaleNotes = chordNotes
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
				chordNotes,
				// setTrackFeatures,
				// getArtistCoverURL,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppState = () => useContext(AppContext)
