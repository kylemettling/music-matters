import logo from '../logo.svg'
import './header.css'
import './style.css'
import React, { useState } from 'react'
import { MdOutlinePalette } from 'react-icons/md'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Header() {
	const [themeToggle, setThemeToggle] = useState(false)
	const history = useHistory()

	function handleThemeToggle(e) {
		!themeToggle
			? e.target.classList.add('themeSelectForward')
			: e.target.classList.remove('themeSelectForward')
		!themeToggle
			? e.target.classList.remove('themeSelectBackward')
			: e.target.classList.add('themeSelectBackward')
		!themeToggle
			? document.body.classList.remove('dark')
			: document.body.classList.add('dark')
		setThemeToggle(!themeToggle)
	}

	useEffect(
		(e) => {
			console.log(themeToggle)
		},
		[themeToggle]
	)

	return (
		<React.Fragment>
			<MdOutlinePalette
				className='themeSelect flex'
				onClick={(e) => handleThemeToggle(e)}
			/>
			<Link to='/'>
				<header>
					{/* <div className='leftHeader'></div> */}
					<img src={logo} className='logo' alt='logo' />
					{/* <div className='rightHeader'></div> */}
				</header>
			</Link>
		</React.Fragment>
	)
}
