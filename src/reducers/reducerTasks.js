const initialState = []

export const reducerTasks = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'write_tasks': {
			return payload
		}
		case 'edit_task': {
			return state.map(task => task.id === payload.id ? { ...task, ...payload.data } : task)
		}
		case 'create_task': {
			return [...state, payload]
		}
		case 'delete_task': {
			return state.filter(task => task.id !== payload)
		}
		default: return state
	}
}
