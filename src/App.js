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
						<Track />
					</Route>
					<Route path='/artist/:id'>
						<Track />
					</Route>
					<Route path='/'>
						<Header />
						<Search />
					</Route>
				</Switch>
			</Router>
		</Fragment>
	)
}

export default App
