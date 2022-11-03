import { Draggable } from 'react-beautiful-dnd'

function Chord({ item }) {
	// console.log('chord', item.id)
	return (
		<Draggable
			draggableId={item.id.toString()}
			index={item.position}
			key={item.id}
		>
			{(provided) => (
				<div
					className='chord-detail'
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<a href='/' {...provided.dragHandleProps}>
						Drag Me!
					</a>
					<span className='title'>{item.title}</span>
					<div>
						{item.position} - {item.title}
					</div>
					<div>{item.artist}</div>
					<div>{item.released}</div>
				</div>
			)}
		</Draggable>
	)
}

export default Chord
