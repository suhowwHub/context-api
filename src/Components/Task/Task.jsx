import "../Task/Task.css"

export default function Task() {
	return (
		<div className="todo-item">
			<input type="checkbox" className="todo-checkbox" />
			<label htmlFor="task" className="todo-text">
				Какая-то задача
			</label>
			<button className="delete-btn">Удалить</button>
		</div>
	)
}
