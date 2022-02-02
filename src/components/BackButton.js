import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

export function BackButton() {
	const history = useHistory()
	return (
		<div
			className='backButton flex'
			style={{
				top: '0',
				// padding: '0 .75%',
				// position: 'sticky',
				// top: '0.25rem',
				// left: '0',
			}}
		>
			<button
				style={{
					width: '85px',
					height: '35px',
					// margin: '0 13%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
				onClick={() => history.goBack()}
			>
				<FiArrowLeft
					style={{
						padding: '0px',
						marginTop: '1px',
						margin: '0px',
					}}
				/>{' '}
				{/* Back */}
			</button>
		</div>
	)
}
