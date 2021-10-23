module.exports = {
	shazam: {
		urls: {
			search: 'https://shazam.p.rapidapi.com/search',
			trackDetail: 'https://shazam.p.rapidapi.com/songs/get-details',
		},
		host: process.env.REACT_APP_SHAZAM_HOST,
		key: process.env.REACT_APP_API_KEY,
	},
	spotify: {
		urls: {
			getTrack: 'https://api.spotify.com/v1/tracks/',
			getTrackFeatures: 'https://api.spotify.com/v1/audio-features/',
			getArtistDetails: 'https://api.spotify.com/v1/artists/',
		},
		clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
		clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
	},
}
