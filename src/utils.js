export const updateTaskList = (tasks, taskId, newTaskDate) =>
	tasks.map(task => task.id === taskId ? { ...task, ...newTaskDate } : task)

export const deletedTaskFromList = (tasks, taskId) => tasks.filter(task => task.id !== taskId)

export const createNewTask = (title) => { return { title: title, id: '', completed: false, } }

export const findTask = (tasks, taskId) => tasks.find(({ id }) => id === taskId)

export const toggleActiveButton = (buttons, nameButtonFocus) => buttons.map((button) =>
	button.name === nameButtonFocus ? { ...button, isActive: true } : { ...button, isActive: false }
)
export const toggleFilter = (tasks, filter) => tasks.filter(task => {
	if (filter === 'Все') return true
	else if (filter === 'Активные') return !task.completed
	else if (filter === 'Завершенные') return task.completed
})

export const searchingCoincidences = (tasks, phrase) => tasks.filter((task) =>
	task.title.toLowerCase().includes(phrase.toLowerCase())
)

