import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

export function BackButton() {
	const history = useHistory()
	return (
		<button
			style={{
				width: '85px',
				height: '35px',
				// padding: '5px',
				margin: '0 13%',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				gap: '4px',
				alignItems: 'center',
			}}
			onClick={() => history.goBack()}
		>
			<FiArrowLeft
				style={{
					// height: '40px',
					padding: '0px',
					margin: '0px',
				}}
			/>{' '}
			{/* Back */}
		</button>
	)
}
