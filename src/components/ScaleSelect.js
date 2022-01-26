import React, { useState } from 'react'

export function ScaleSelect() {
	const [keyOptionState, setKeyOptionState] = useState(null)
	const [modeOptionState, setModeOptionState] = useState(null)
	return (
		<div>
			<div className='header'>
				{/* {type === 'starting' ? <h3>Suggested scale</h3> : <h3>Chordbook!</h3>} */}
			</div>
			<div className='key-mode-select-con'>
				<select
					name='KeySelector'
					id='key_selector'
					value={keyOptionState}
					onChange={(e) => setKeyOptionState(e.target.value)}
				>
					<option value='C'>C</option>
					<option value='C#'>C#</option>
					<option value='Db'>Db</option>
					<option value='D'>D</option>
					<option value='D#'>D#</option>
					<option value='Eb'>Eb</option>
					<option value='E'>E</option>
					<option value='F'>F</option>
					<option value='F#'>F#</option>
					<option value='Gb'>Gb</option>
					<option value='G'>G</option>
					<option value='G#'>G#</option>
					<option value='Ab'>Ab</option>
					<option value='A'>A</option>
					<option value='A#'>A#</option>
					<option value='Bb'>Bb</option>
					<option value='B'>B</option>
				</select>
				<select
					name='ModeSelector'
					id='mode_selector'
					value={modeOptionState}
					onChange={(e) => setModeOptionState(e.target.value)}
				>
					<option value='ionian'>Ionian (I) - major</option>
					<option value='dorian'>Dorain (II) - minor</option>
					<option value='phrygian'>Phrygian (III) - minor</option>
					<option value='lydian'>Lydian (IV) - major</option>
					<option value='mixolydian'>Mixolydian (V) - major</option>
					<option value='aeolian'>Aeolian (VI) - minor</option>
					<option value='locrian'>Locrian (VII) - diminished</option>
				</select>
				<button
					className='key-mode-submit'
					onClick={(e) => handleScaleChange(e)}
				>
					Get Scale
				</button>
			</div>
		</div>
	)
}
