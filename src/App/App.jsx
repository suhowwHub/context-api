import "./App.css"
import { TaskListContext } from "../Context/Context.jsx"
import ControlPanel from "../Components/ControlPanel/ControlPanel.jsx"
import TasksList from "../Components/TasksList/TasksList.jsx"
import { useReducer, useState, useEffect } from "react"
import { reducerTasks } from "../reducers/reducerTasks.js"
import { readTasks } from "../utils/functions/api.js"

export default function App() {
	const [loadedTasks, dispatch] = useReducer(reducerTasks, [])
	const [filteredTasks, setFilteredTasks] = useState([])
	const [statusFilter, setStatusFilter] = useState("Все")
	const [searchQuery, setSearchQuery] = useState("")
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const newFilteredTasks = loadedTasks.filter((task) => {
			const statusMatch =
				statusFilter === "Все" ||
				(statusFilter === "Активные" && !task.completed) ||
				(statusFilter === "Завершенные" && task.completed)
			const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase())

			return statusMatch && searchMatch
		})
		setFilteredTasks(newFilteredTasks)
	}, [loadedTasks, statusFilter, searchQuery])

	useEffect(() => {
		readTasks()
			.then((tasksListData) => {
				dispatch({ type: "write_tasks", payload: tasksListData })
			})
			.finally(() => setIsLoading(false))
	}, [isLoading])

	return (
		<div className="todo-container">
			<h1>Список дел</h1>
			<TaskListContext
				value={{
					loadedTasks,
					dispatch,
					statusFilter,
					setStatusFilter,
					filteredTasks,
					searchQuery,
					setSearchQuery,
					isLoading,
					setIsLoading,
				}}>
				<ControlPanel />
				<TasksList />
			</TaskListContext>
		</div>
	)
}
