import "./App.css"
import { TaskListContext } from "../Context/Context.jsx"
import ControlPanel from "../ControlPanel/ControlPanel.jsx"
import TasksList from "../TasksList/TasksList.jsx"
import Loader from "../TasksList/Loader/Loader.jsx"
import { useReducer, useRef } from "react"
// import { readTasks } from "../../api.js"
import { reducerTasks } from "../utils/functions/reducerTasksFn.js"

export default function App() {
	const loadedTasksRef = useRef([])
	const [filteredTasks, dispatch] = useReducer(reducerTasks, [])

	return (
		<div className="todo-container">
			<h1>Список дел</h1>
			<TaskListContext
				value={{
					loadedTasksRef: loadedTasksRef,
					filteredTasks: filteredTasks,
					dispatch: dispatch,
				}}>
				<ControlPanel />
				<TasksList />
			</TaskListContext>
		</div>
	)
}
