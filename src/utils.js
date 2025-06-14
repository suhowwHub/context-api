export const updateTaskList = (tasks, taskId, newTaskDate) =>
	tasks.map(task => task.id === taskId ? { ...task, ...newTaskDate } : task)

export const deletedTaskFromList = (tasks, taskId) => tasks.filter(task => task.id !== taskId)

export const findTask = (tasks, taskId) => tasks.find(({ id }) => id === taskId)
