import Header from './components/header.js'
import { Fragment, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TrackDetail } from './components/TrackDetail.js'
import { Artist } from './components/Artist.js'
import { PageWrapper } from './state'
import { Helmet } from 'react-helmet'
import './components/style.css'

function App() {
	document.body.classList.add('dark')
	return (
		<PageWrapper>
			<Fragment>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Music Matters - Audio Arranged</title>
					<meta name='description' content='Music Matters - Audio Arranged' />
				</Helmet>
				<Router>
					<Switch>
						<Route path='/track/:id'>
							<Header />
							<TrackDetail />
						</Route>
						<Route path='/artist/:id'>
							<Header />
							<Artist />
						</Route>
						<Route path='/search'>
							<Header />
							<Search />
							<Results />
						</Route>
						{/* <Route path='/search/?q=searchValue'>
							<Header includeBackButton={false} />
							<Search />
						</Route> */}
						<Route path='/' exact>
							<Header includeBackButton={false} />
							<Search />
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
