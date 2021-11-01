import React, { createContext, useContext } from 'react'
import { useSpotifyToken, useTrack } from '../components/hooks'

export const AppContext = createContext({})

export const PageWrapper = ({ children }) => {
	const { token, refreshToken, getStoredToken } = useSpotifyToken()
	const {
		songTitle,
		songArtist,
		songAlbum,
		albumCoverURL,
		artistCover,
		getTrackDetails,
		// getArtistCoverURL,
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
				albumCoverURL,
				artistCover,
				getTrackDetails,
				// getArtistCoverURL,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppState = () => useContext(AppContext)
