import "./FilterButton.css"
import { TaskListContext } from "../../../Context/Context"
import { useContext } from "react"

export default function FilterButton({ filterName, onChangeStatusFilter }) {
	const { statusFilter } = useContext(TaskListContext)
	return (
		<button
			type="button"
			className={`sort-button ${statusFilter === filterName ? "active" : ""}`}
			onClick={() => onChangeStatusFilter(filterName)}>
			{filterName}
		</button>
	)
}
