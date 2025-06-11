import "../Task/Task.css"

export default function Task({ title, completed }) {
	return (
		<div className="todo-item">
			<input type="checkbox" className="todo-checkbox" defaultChecked={completed} />
			<label htmlFor="task" className="todo-text">
				{title}
			</label>
		</div>
	)
}
