import FilterButton from "../FilterButton/FilterButton"
import "./Filter.css"
import { toggleActiveButton, toggleFilter } from "../../utils.js"
import { useState } from "react"

export default function Filter({ searchingTasks, setFilteredTasks }) {
	const [buttons, setButtons] = useState([
		{ id: 1, name: "Все", isActive: true },
		{ id: 2, name: "Активные", isActive: false },
		{ id: 3, name: "Завершенные", isActive: false },
	])
	function onFilterTasks(filterName) {
		setButtons(toggleActiveButton(buttons, filterName))
		setFilteredTasks(toggleFilter(searchingTasks, filterName))
	}
	return (
		<div className="button-container">
			{buttons.map(({ id, name, isActive }) => (
				<FilterButton
					key={id}
					name={name}
					isActive={isActive}
					onFilter={onFilterTasks}
				/>
			))}
		</div>
	)
}
