import "./TaskRead.css"
export const ReadTask = ({
	completed,
	currentTitle,
	id,
	onSave,
	onEditing,
	setIsEditing,
}) => {
	return (
		<div className="todo-item-read">
			<input
				type="checkbox"
				className="todo-checkbox"
				defaultChecked={completed}
				onChange={({ target }) => onSave(id, { completed: target.checked })}
			/>
			<div className="todo-text block">{currentTitle}</div>
			<button
				type="button"
				className="edit-button save-button"
				onClick={() => {
					onEditing(id, { isEditing: true })
					setIsEditing(true)
				}}>
				✎
			</button>
		</div>
	)
}
