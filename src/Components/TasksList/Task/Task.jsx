import { useState } from "react"
import "./Task.css"
import { EditorTask } from "./EditorTask/EditorTask"
import { ReadTask } from "./TaskRead/TaskRead"

export default function Task({ title, completed, id, onSave, onDelete, onEditing }) {
	const [currentTitle, setCurrentTitle] = useState(title)
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className={isEditing ? "todo-item-container editing" : "todo-item-container"}>
			{isEditing ? (
				<EditorTask
					currentTitle={currentTitle}
					setCurrentTitle={setCurrentTitle}
					onSave={onSave}
					onDelete={onDelete}
					setIsEditing={setIsEditing}
					id={id}
				/>
			) : (
				<ReadTask
					completed={completed}
					currentTitle={currentTitle}
					id={id}
					onSave={onSave}
					onEditing={onEditing}
					setIsEditing={setIsEditing}
				/>
			)}
		</div>
	)
}
