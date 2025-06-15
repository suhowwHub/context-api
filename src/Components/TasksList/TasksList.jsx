import "./TasksList.css"
import Loader from ".././Loader/Loader.jsx"
import Task from ".././Task/Task.jsx"
import { updateTask, deleteTask } from "../../api.js"
import { updateTaskList, findTask, deletedTaskFromList } from "../../utils.js"

export default function TasksList({ filteredTasks, setLoadedTasks, isLoading }) {
	function onEditingTask(id, taskData) {
		setLoadedTasks(updateTaskList(filteredTasks, id, taskData))
	}
	function onSaveTask(id, taskData) {
		setLoadedTasks(updateTaskList(filteredTasks, id, taskData))
		const { isEditing, ...otherTaskData } = findTask(filteredTasks, id)
		updateTask({ id, ...otherTaskData, ...taskData })
	}
	function onDeleteTask(id) {
		setLoadedTasks(deletedTaskFromList(filteredTasks, id))
		deleteTask(id)
	}

	return (
		<div className="task-list">
			{isLoading ? (
				<Loader />
			) : (
				filteredTasks.map(({ title, completed, id, isEditing = false }) => (
					<Task
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={onEditingTask}
						onSave={onSaveTask}
						onDelete={onDeleteTask}
					/>
				))
			)}
		</div>
	)
}
