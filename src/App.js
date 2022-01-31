import Header from './components/header.js'
import { Fragment, useEffect } from 'react'
// import Profile from './components/profile'
import Search from './components/Search'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TrackDetail } from './components/TrackDetail.js'
import { Artist } from './components/Artist.js'
import { Chordbook } from './components/Chordbook.js'
import { PageWrapper } from './state'
// import './App.css'
import './components/style.css'
import { useScript } from './components/hooks/useScript.js'
import { TestChordbook } from './components/TestChordbook'
// import { SpotifyToken } from "./components/SpotifyToken.js";

function App() {
	useScript('https://www.scales-chords.com/api/scales-chords-api.js')
	document.body.classList.add('dark')
	// document.body.classList.add('layout')
	return (
		<PageWrapper>
			<Fragment>
				<Router>
					<Header />
					<Switch>
						<Route path='/track/:id'>
							<TrackDetail />
						</Route>
						<Route path='/artist/:id'>
							<Artist />
						</Route>
						<Route path='/' exact>
							{/* <SpotifyToken /> */}
							<Search />
							{/* <TestChordbook /> */}
							{/* <Chordbook /> */}
						</Route>
					</Switch>
				</Router>
				<link
					rel='stylesheet'
					href='https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css'
				></link>
				<link rel='preconnect' href='https://fonts.googleapis.com'></link>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				></link>
				<link
					href='https://fonts.googleapis.com/css2?family=Neuton&display=swap'
					rel='stylesheet'
				></link>
				<style>
					@import uimport {useEffect} from 'react';
					rl('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Yantramanav:wght@100&display=swap');
				</style>
			</Fragment>
		</PageWrapper>
	)
}

export default App
