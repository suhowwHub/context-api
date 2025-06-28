import "./TasksList.css"
import Task from "./Task/Task.jsx"
import { useContext, useEffect } from "react"
import { TaskListContext } from "../Context/Context.jsx"
import { readTasks, updateTask, deleteTask } from "../../api.js"
import { reducerTasks, findTask } from "../utils/index.js"

export default function TasksList() {
	const { filteredTasks, loadedTasksRef, dispatch } = useContext(TaskListContext)

	useEffect(() => {
		readTasks().then((tasksListData) => {
			dispatch({ type: "write_tasks", data: tasksListData })
			loadedTasksRef.current = tasksListData
		})
	}, [])

	const onEditingTask = (taskID, isEditing) => {
		dispatch({ type: "edit_task", id: taskID, data: isEditing })
	}

	const onEditTask = (id, taskData) => {
		const action = { type: "edit_task", id: id, data: taskData }
		dispatch(action)
		loadedTasksRef.current = reducerTasks(loadedTasksRef.current, action)
		updateTask({ id, ...findTask(loadedTasksRef.current, id), ...taskData })
	}

	const onDeleteTask = (id) => {
		const action = { type: "delete_task", id: id }
		dispatch(action)
		loadedTasksRef.current = reducerTasks(loadedTasksRef.current, action)
		deleteTask(id)
	}

	return (
		<div className="task-list">
			{filteredTasks.map(({ title, completed, id, isEditing = false }) => (
				<Task
					key={id}
					id={id}
					title={title}
					completed={completed}
					onEditing={onEditingTask}
					onSave={onEditTask}
					onDelete={onDeleteTask}
					isEditing={isEditing}
				/>
			))}
		</div>
	)
}
