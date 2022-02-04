import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
// import styled from '@emotion/styled'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import type { Quote as QuoteType } from "../types";

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
	const custom = {
		id: `id-${k}`,
		content: `Chord ${k}`,
	}

	return custom
})

const grid = 8
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const ChordItem = styled.div`
	width: 200px;
	border: 1px solid grey;
	margin-bottom: ${grid}px;
	background-color: lightblue;
	padding: ${grid}px;
`

function Chord({ chord, index }) {
	return (
		<Draggable draggableId={chord.id} index={index}>
			{(provided) => (
				<ChordItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{chord.content}
				</ChordItem>
			)}
		</Draggable>
	)
}

const ChordList = React.memo(function ChordList({ chords }) {
	return chords.map((chord, index) => (
		<Chord chord={chord} index={index} key={chord.id} />
	))
})

export function TestChordbook() {
	const [state, setState] = useState({ chords: initial })

	function onDragEnd(result) {
		if (!result.destination) {
			return
		}

		if (result.destination.index === result.source.index) {
			return
		}

		const chords = reorder(
			state.quotes,
			result.source.index,
			result.destination.index
		)

		setState({ chords })
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='list'>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<ChordList chords={state.chords} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

// const rootElement = document.getElementById('root')
// ReactDOM.render(<QuoteApp />, rootElement)
