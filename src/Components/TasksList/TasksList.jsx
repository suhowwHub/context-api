import "./TasksList.css"
import Task from "./Task/Task.jsx"
import Loader from "../TasksList/Loader/Loader.jsx"
import { useContext } from "react"
import { TaskListContext } from "../../Context/Context.jsx"
import { updateTask, deleteTask } from "../../utils/functions/api.js"
import { findTask } from "../../utils/functions/findTaskFn.js"

export default function TasksList() {
	const { loadedTasks, dispatch, filteredTasks, isLoading } = useContext(TaskListContext)

	const onSetInProcessEditing = (taskID) => {
		dispatch({ type: "edit_task", payload: taskID })
	}

	const onEditTask = (taskID, taskData) => {
		const action = { type: "edit_task", payload: { id: taskID, data: taskData } }
		dispatch(action)
		updateTask({ taskID, ...findTask(loadedTasks, taskID), ...taskData })
	}

	const onDeleteTask = (taskID) => {
		const action = { type: "delete_task", payload: taskID }
		dispatch(action)
		deleteTask(taskID)
	}

	return (
		<div className="task-list">
			{isLoading ? (
				<Loader />
			) : (
				filteredTasks.map(({ title, completed, id }) => (
					<Task
						key={id}
						id={id}
						title={title}
						completed={completed}
						onEditing={onSetInProcessEditing}
						onSave={onEditTask}
						onDelete={onDeleteTask}
					/>
				))
			)}
		</div>
	)
}
