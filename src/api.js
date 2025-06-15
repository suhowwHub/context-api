function fetchRequest(method, { id, ...taskDate } = {}) {
	let url = "http://localhost:3000/tasks"
	const options = {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
	}
	if (id !== undefined) {
		if (method !== "POST") {
			url += `/${id}`
			options.body = JSON.stringify(taskDate)
		} else {
			options.body = JSON.stringify(taskDate)
		}
	}

	return fetch(url, options).then(jsonDate => jsonDate.json())
}

export const createTask = (taskDate) => fetchRequest("POST", taskDate)
export const readTasks = () => fetchRequest("GET")
export const updateTask = (taskDate) => fetchRequest("PUT", taskDate)
export const deleteTask = (taskID) => fetchRequest("DELETE", { id: taskID })
