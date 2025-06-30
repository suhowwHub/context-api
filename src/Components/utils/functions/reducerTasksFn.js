export const reducerTasks = (tasks, action) => {
	switch (action.type) {
		case 'write_tasks': {
			return action.payload
		}
		case 'edit_task': {
			return tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload.data } : task)
		}
		case 'create_task': {
			return [...tasks, action.payload]
		}
		case 'delete_task': {
			return tasks.filter(task => task.id !== action.payload)
		}
	}
}
