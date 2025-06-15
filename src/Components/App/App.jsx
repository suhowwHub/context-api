import "./App.css"
import ControlPanel from "../ControlPanel/ControlPanel.jsx"
import TasksList from "../TasksList/TasksList.jsx"
import { useState, useEffect } from "react"
import { readTasks, createTask } from "../../api.js"

export default function App() {
	const [loadedTasks, setLoadedTasks] = useState([])
	const [filteredTasks, setFilteredTasks] = useState(loadedTasks)
	const [isLoading, setIsLoading] = useState(false)

	const loadingTasksData = () => {
		setIsLoading(true)
		readTasks()
			.then((tasksListData) => {
				setLoadedTasks(tasksListData)
				setFilteredTasks(tasksListData)
			})
			.finally(() => setIsLoading(false))
	}

	useEffect(() => setFilteredTasks(loadedTasks), [loadedTasks])

	useEffect(() => {
		loadingTasksData()
	}, [])

	return (
		<div className="todo-container">
			<h1>Список дел</h1>
			<ControlPanel
				loadedTasks={loadedTasks}
				filteredTasks={filteredTasks}
				setFilteredTasks={setFilteredTasks}
				loadingTasksData={loadingTasksData}
			/>
			<TasksList
				filteredTasks={filteredTasks}
				setLoadedTasks={setLoadedTasks}
				isLoading={isLoading}
			/>
		</div>
	)
}
