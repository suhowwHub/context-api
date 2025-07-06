export const sortTaskList = (tasks, filter) => tasks.filter(task => {
	if (filter === "Все") return true
	else if (filter === 'Активные') return !task.completed
	else if (filter === 'Завершенные') return task.completed
})
