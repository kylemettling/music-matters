import Header from './components/header.js'
import { Fragment } from 'react'
import Profile from './components/profile'
import Search from './components/search'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Track } from './components/Track.js'
import './App.css'

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route path='/track/:id'>
						<Header />
						<Track />
					</Route>
					<Route path='/artist/:id'>
						<Header />
						<Track />
					</Route>
					<Route path='/'>
						<Header />
						<Search />
					</Route>
				</Switch>
			</Router>
			<style>
				@import
				url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Yantramanav:wght@100&display=swap');
			</style>
		</Fragment>
	)
}

export default App
