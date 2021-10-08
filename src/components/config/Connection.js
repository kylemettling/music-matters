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
		urls: {},
		clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
		clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
	},
}
