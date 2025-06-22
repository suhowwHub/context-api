import "./ControlPanel.css"
import Filter from "../Filter/Filter"
import { createNewTask, searchingCoincidences } from "../../utils.js"
import { createTask } from "../../api.js"
import { useEffect, useState } from "react"

export default function ControlPanel({
	loadedTasks,
	setFilteredTasks,
	loadingTasksData,
}) {
	const [newTitle, setNewTitle] = useState("")
	const [timerId, setTimerId] = useState(null)
	const [searchingTasks, setSearchingTasks] = useState(loadedTasks)

	useEffect(() => setSearchingTasks(loadedTasks), [loadedTasks])

	useEffect(() => {
		const onCreateTaskKeyDown = (e) => {
			if (e.key === "Enter") onCreateTask(newTitle)
		}
		document.addEventListener("keydown", onCreateTaskKeyDown)
		return () => document.removeEventListener("keydown", onCreateTaskKeyDown)
	}, [newTitle, onCreateTask])

	function onCreateTask(title) {
		if (title) {
			const newTask = createNewTask(title)
			createTask(newTask)
			setNewTitle("")
			loadingTasksData()
		}
	}

	function searchingTask(phrase) {
		if (phrase !== "") {
			const suitableTasks = searchingCoincidences(loadedTasks, phrase)
			setFilteredTasks(suitableTasks)
			setSearchingTasks(suitableTasks)
		} else {
			setFilteredTasks(loadedTasks)
			setSearchingTasks(loadedTasks)
		}
	}

	function debounceSearchingTask(phrase) {
		if (timerId) clearTimeout(timerId)
		setTimerId(setTimeout(() => searchingTask(phrase), 700))
	}

	return (
		<div className="control-panel">
			<div className="input-container">
				<input
					type="text"
					className="task"
					placeholder="Добавить или найти задачу..."
					value={newTitle}
					onChange={({ target }) => {
						debounceSearchingTask(target.value)
						setNewTitle(target.value)
					}}
				/>
				<button className="button add-btn" onClick={(e) => onCreateTask(newTitle, e)}>
					Добавить
				</button>
			</div>
			<Filter searchingTasks={searchingTasks} setFilteredTasks={setFilteredTasks} />
		</div>
	)
}
