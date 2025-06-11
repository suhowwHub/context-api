import "./App.css"
import Loader from ".././Loader/Loader.jsx"
import Task from ".././Task/Task.jsx"
import TODOS_MOCK from "../../../todosMock.js"
import { useEffect, useState } from "react"

export default function App() {
	const [todoList, setTodoList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		new Promise((resolve) => {
			setTimeout(() => {
				resolve({ json: () => TODOS_MOCK })
			}, 1500)
		})
			.then((response) => response.json())
			.then((responseDate) => {
				setTodoList(responseDate)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [todoList])

	return (
		<div className="todo-container">
			<h1>Список дел</h1>
			<div className="task-list">
				{isLoading ? (
					<Loader />
				) : (
					todoList.map(({ title, completed, id }) => (
						<Task key={id} title={title} completed={completed} />
					))
				)}
			</div>
			<div className="task-counter">Количество задач: {todoList.length}</div>
			<button className="update-button" onClick={() => setTodoList([])}>
				Обновить
			</button>
		</div>
	)
}
