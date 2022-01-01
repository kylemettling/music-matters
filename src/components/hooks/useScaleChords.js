import { useState, useEffect } from 'react'
import { useAppState } from '../../state'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { spotify } from '../config/Connection'
import axios from 'axios'

export const useScaleChords = ({ mode = 'I', keyCenter = 'C' }) => {
	const [scaleChords, setScaleChords] = useState({})
	// const { songKeyCenterQuality } = useAppState()

	return {
		scaleChords,
	}
}
