import "./EditorTask.css"
export const EditorTask = ({
	currentTitle,
	setCurrentTitle,
	onSave,
	onDelete,
	setIsEditing,
	id,
}) => {
	return (
		<div className="todo-text-editor">
			<input
				type="text"
				className="todo-text input editing"
				defaultValue={currentTitle}
				onChange={({ target }) => setCurrentTitle(target.value)}
				onBlur={() => {
					onSave(id, { title: currentTitle, isEditing: false })
					setIsEditing(false)
				}}
			/>
			<button
				type="button"
				className="edit-button delete-button"
				onClick={() => onDelete(id)}>
				×
			</button>
		</div>
	)
}
