import React, { createContext, useContext } from 'react'
import { useSpotifyToken } from '../components/hooks'

export const AppContext = createContext({})

export const PageWrapper = ({ children }) => {
	const { token, refreshToken, getStoredToken } = useSpotifyToken()
	return (
		<AppContext.Provider value={{ token, refreshToken, getStoredToken }}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppState = () => useContext(AppContext)
