import React, { createContext, useContext } from 'react'
import {
	useSpotifyToken,
	useTrack,
	useScaleChords,
	useChordList,
} from '../components/hooks'
// import scaleNotes from './scaleNotes'
// import scaleChordStructure from './scaleChordStructure'

export const AppContext = createContext({})

export const PageWrapper = ({ children }) => {
	const { token, refreshToken, getStoredToken } = useSpotifyToken()
	const { getScaleChords } = useScaleChords()
	// const { fullChordList, setFullChordList } = useChordList()
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
		setIsActiveTrack,
		clearTrackData,
		getTrackFeatures,
		getArtistCoverURL,
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
				setIsActiveTrack,
				// scaleNotes,
				getScaleChords,
				getTrackFeatures,
				getArtistCoverURL,
				// fullChordList,
				// setFullChordList,
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
