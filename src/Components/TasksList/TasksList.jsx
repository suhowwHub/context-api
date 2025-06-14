import "./TasksList.css"
import Loader from ".././Loader/Loader.jsx"
import Task from ".././Task/Task.jsx"
import { updateTask, deleteTask } from "../../api.js"
import { updateTaskList, findTask, deletedTaskFromList } from "../../utils.js"

export default function TasksList({ tasks, setTasks, isLoading }) {
	function onEditingTask(id, taskData) {
		setTasks(updateTaskList(tasks, id, taskData))
	}
	function onSaveTask(id, taskData) {
		setTasks(updateTaskList(tasks, id, taskData))
		const { title } = findTask(tasks, id)
		updateTask({ id, title })
	}
	function onCompletedTask(id, taskData) {
		setTasks(updateTaskList(tasks, id, taskData))
		const { completed } = findTask(tasks, id)
		updateTask({ id, completed })
	}
	function onDeleteTask(id) {
		setTasks(deletedTaskFromList(tasks, id))
		deleteTask(id)
	}

	return (
		<div className="task-list">
			{isLoading ? (
				<Loader />
			) : (
				tasks.map(({ title, completed, id, isEditing = false }) => (
					<Task
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={onEditingTask}
						onSave={onSaveTask}
						onCompleted={onCompletedTask}
						onDelete={onDeleteTask}
					/>
				))
			)}
		</div>
	)
}
