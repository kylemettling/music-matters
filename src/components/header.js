import logo from '../logo.svg'
import './header.css'
import './style.css'
import React from 'react'

export default function Header() {
	return (
		<React.Fragment>
			<div>
				<header>
					{/* <div className='leftHeader'></div> */}
					<img src={logo} className='logo' alt='logo' />
					{/* <div className='rightHeader'></div> */}
				</header>
			</div>
		</React.Fragment>
	)
}
