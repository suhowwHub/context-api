import "./ControlPanel.css"
import Filter from "../Filter/Filter"
import { createNewTask, searchingCoincidences } from "../../utils.js"
import { createTask } from "../../api.js"
import { useEffect, useState } from "react"

export default function ControlPanel({
	loadedTasks,
	filteredTasks,
	setFilteredTasks,
	loadingTasksData,
}) {
	const [newTitle, setNewTitle] = useState("")
	const [timerId, setTimerId] = useState(null)
	const [searchingTasks, setSearchingTasks] = useState(loadedTasks)

	useEffect(() => setSearchingTasks(loadedTasks), [filteredTasks])

	function onCreateTask(title) {
		const newTask = createNewTask(title)
		createTask(newTask)
		setNewTitle("")
		loadingTasksData()
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
				<button className="button add-btn" onClick={() => onCreateTask(newTitle)}>
					Добавить
				</button>
			</div>
			<Filter searchingTasks={searchingTasks} setFilteredTasks={setFilteredTasks} />
		</div>
	)
}
