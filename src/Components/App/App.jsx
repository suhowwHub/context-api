import "./App.css"
import ControlPanel from "../controlPanel/ControlPanel.jsx"
import TasksList from "../TasksList/TasksList.jsx"
import { useState, useEffect } from "react"
import { readTasks } from "../../api.js"

export default function App() {
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		readTasks()
			.then((tasksList) => setTasks(tasksList))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div className="todo-container">
			<h1>Список дел</h1>
			<ControlPanel />
			<TasksList tasks={tasks} setTasks={setTasks} isLoading={isLoading} />
		</div>
	)
}
