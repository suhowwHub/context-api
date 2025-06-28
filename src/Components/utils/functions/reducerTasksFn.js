export const reducerTasks = (tasks, action) => {
	switch (action.type) {
		case 'write_tasks': {
			return action.data
		}
		case 'edit_task': {
			return tasks.map(task => task.id === action.id ? { ...task, ...action.data } : task)
		}
		case 'create_task': {
			return [...tasks, { ...action.newTask }]
		}
		case 'delete_task': {
			return tasks.filter(task => task.id !== action.id)
		}
		case 'search_task': {
			return tasks.filter((task) =>
				task.title.toLowerCase().includes(action.phrase.toLowerCase()))
		}
		default: {
			console.log(tasks)
		}
	}
}
