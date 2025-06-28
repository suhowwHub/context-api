import { useState } from "react"
import "./Task.css"

export default function Task({
	title,
	completed,
	id,
	onSave,
	onDelete,
	onEditing,
	isEditing,
}) {
	const [currentTitle, setCurrentTitle] = useState(title)

	return (
		<div className={isEditing ? "todo-item editing" : "todo-item"}>
			{isEditing ? (
				<div className="todo-text-editor">
					<input
						type="text"
						className="todo-text input editing"
						defaultValue={currentTitle}
						onChange={({ target }) => setCurrentTitle(target.value)}
						onBlur={() => onSave(id, { title: currentTitle, isEditing: false })}
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
						onChange={({ target }) => onSave(id, { completed: target.checked })}
					/>
					<div className="todo-text block">{currentTitle}</div>
					<button
						type="button"
						className="edit-button save-button"
						onClick={() => onEditing(id, { isEditing: true })}>
						✎
					</button>
				</div>
			)}
		</div>
	)
}
