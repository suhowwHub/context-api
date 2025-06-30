import FilterButton from "./FilterButton/FilterButton.jsx"
import "./Filter.css"
import { TaskListContext } from "../../Context/Context.jsx"
import { useContext } from "react"

export default function Filter() {
	const { setStatusFilter } = useContext(TaskListContext)
	const changeStatusFilter = (filterName) => {
		if (filterName === "Все") setStatusFilter(filterName)
		else if (filterName === "Активные") setStatusFilter(filterName)
		else setStatusFilter(filterName)
	}
	return (
		<div className="button-container">
			{["Все", "Активные", "Завершенные"].map((filterName) => (
				<FilterButton
					key={filterName}
					filterName={filterName}
					onChangeStatusFilter={changeStatusFilter}
				/>
			))}
		</div>
	)
}
