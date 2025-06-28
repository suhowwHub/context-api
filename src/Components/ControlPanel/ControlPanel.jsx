import "./ControlPanel.css"
import Filter from "./Filter/Filter.jsx"
import { TaskListContext } from "../Context/Context.jsx"
import { createTask, readTasks } from "../../api.js"
import { reducerTasks } from "../utils/index.js"
import { sortTaskList, SEARCH_DELAY } from "./utils/index.js"
import { useEffect, useState, useContext, useRef, useMemo } from "react"

export default function ControlPanel() {
	const { loadedTasksRef, dispatch } = useContext(TaskListContext)
	const [titleInput, setTitleInput] = useState("")
	const timerIDRef = useRef()
	const searchTaskList = useMemo(
		() =>
			reducerTasks(loadedTasksRef.current, {
				type: "search_task",
				phrase: titleInput,
			}),
		[titleInput]
	)

	const onCreateTask = (title) => {
		if (title) {
			const newTask = { title: title, completed: false, id: "" }
			setTitleInput("")
			dispatch({ type: "create_task", newTask: newTask })
			createTask(newTask)
			readTasks().then((tasksListData) => {
				dispatch({ type: "write_tasks", data: tasksListData })
			})
		}
	}

	const onToggleFilter = (filterName) => {
		const sortedTaksList = sortTaskList(searchTaskList, filterName)
		dispatch({ type: "write_tasks", data: sortedTaksList })
	}

	const onDebounceSearchingTask = (inputValue) => {
		if (timerIDRef.current) {
			clearTimeout(timerIDRef.current)
			timerIDRef.current = undefined
		}
		timerIDRef.current = setTimeout(
			() => dispatch({ type: "write_tasks", data: searchTaskList }),
			SEARCH_DELAY
		)
		setTitleInput(inputValue)
	}

	useEffect(() => {
		const onCreateTaskKeyDown = (e) => {
			if (e.key === "Enter") onCreateTask(titleInput)
		}
		document.addEventListener("keydown", onCreateTaskKeyDown)
		return () => document.removeEventListener("keydown", onCreateTaskKeyDown)
	}, [])

	return (
		<div className="control-panel">
			<div className="input-container">
				<input
					type="text"
					className="task"
					placeholder="Добавить или найти задачу..."
					value={titleInput}
					onChange={({ target }) => onDebounceSearchingTask(target.value)}
				/>
				<button
					className="button add-btn"
					onClick={(e) => onCreateTask(titleInput, e)}>
					Добавить
				</button>
			</div>
			<Filter onFilter={onToggleFilter} />
		</div>
	)
}
