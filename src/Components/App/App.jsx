import "./App.css"
import Loader from ".././Loader/Loader.jsx"
import Task from ".././Task/Task.jsx"
import { useEffect, useState } from "react"

export default function App() {
	const TODOS_URL = "http://localhost:3000/tasks"
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch(TODOS_URL)
			.then((response) => response.json())
			.then((responseDate) => {
				setTodoList(responseDate)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [TODOS_URL])

	return (
		<div className="todo-container">
			<h1>Список дел</h1>
			<div className="task-counter-wrapper">
				<button className="update-button" onClick={() => setTodoList([])}>
					Обновить
				</button>
				<div className="task-counter">Количество задач: {todoList.length}</div>
			</div>
			<div className="task-list">
				{isLoading ? (
					<Loader />
				) : (
					todoList.map(({ title, completed, id }) => (
						<Task key={id} title={title} completed={completed} />
					))
				)}
			</div>
		</div>
	)
}
