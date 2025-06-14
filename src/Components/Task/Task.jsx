import "../Task/Task.css"

export default function Task({
	title,
	completed,
	id,
	isEditing,
	onEdit,
	onSave,
	onCompleted,
	onDelete,
}) {
	return (
		<div className={isEditing ? "todo-item editing" : "todo-item"}>
			{isEditing ? (
				<div className="todo-text-editor">
					<input
						type="text"
						className="todo-text input editing"
						defaultValue={title}
						onChange={({ target }) => onEdit(id, { title: target.value })}
						onBlur={() => onSave(id, { isEditing: false })}
					/>
					<button
						type="button"
						className="edit-button delete-button"
						onClick={() => onDelete(id)}>
						×
					</button>
				</div>
			) : (
				<div className="todo-item-container">
					<input
						type="checkbox"
						className="todo-checkbox"
						defaultChecked={completed}
						onChange={() => onCompleted(id, { completed: !completed })}
					/>
					<div className="todo-text block">{title}</div>
					<button
						type="button"
						className="edit-button save-button"
						onClick={() => onEdit(id, { isEditing: true })}>
						✎
					</button>
				</div>
			)}
		</div>
	)
}
