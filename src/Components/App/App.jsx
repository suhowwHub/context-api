import "./App.css"
import Loader from ".././Loader/Loader.jsx"
import Task from ".././Task/Task.jsx"

export default function App() {
	return (
		<div className="todo-container">
			<h1>Список дел</h1>

			<div className="task-list">
				<Loader />
				<Task />
			</div>

			<div className="task-counter">Количетсво задач: 0</div>
			<button className="update-button">Обновить</button>
		</div>
	)
}
