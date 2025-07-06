import "./ControlPanel.css"
import Filter from "./Filter/Filter.jsx"
import { TaskListContext } from "../../Context/Context.jsx"
import { createTask } from "../../utils/functions/api.js"
import { SEARCH_DELAY } from "../../utils/constants/constants.js"
import { useEffect, useContext, useRef, useState } from "react"

export default function ControlPanel() {
	const { dispatch, setSearchQuery, setIsLoading } = useContext(TaskListContext)
	const [inputValue, setInputValue] = useState("")
	const timerIDRef = useRef()

	const onCreateTask = (title) => {
		if (title) {
			const newTask = { title: title, completed: false, id: "" }
			createTask(newTask)
			setIsLoading(true)
			dispatch({ type: "create_task", payload: newTask })
			setInputValue("")
			setSearchQuery("")
		}
	}

	const onDebounceChangeSearchQuery = (newInputValue) => {
		setInputValue(newInputValue)
		if (timerIDRef.current) {
			clearTimeout(timerIDRef.current)
			timerIDRef.current = undefined
		}
		timerIDRef.current = setTimeout(() => setSearchQuery(newInputValue), SEARCH_DELAY)
	}

	useEffect(() => {
		const onCreateTaskKeyDown = (e) => {
			if (e.key === "Enter") onCreateTask(inputValue)
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
					value={inputValue}
					onChange={({ target }) => onDebounceChangeSearchQuery(target.value)}
				/>
				<button
					className="button add-btn"
					onClick={(e) => onCreateTask(inputValue, e)}>
					Добавить
				</button>
			</div>
			<Filter />
		</div>
	)
}
