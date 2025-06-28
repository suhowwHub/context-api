import FilterButton from "./FilterButton/FilterButton.jsx"
import { toggleActiveButton } from "../utils/index.js"
import { useState } from "react"
import "./Filter.css"

export default function Filter({ onFilter }) {
	const [buttons, setButtons] = useState([
		{ id: 1, name: "Все", isActive: true },
		{ id: 2, name: "Активные", isActive: false },
		{ id: 3, name: "Завершенные", isActive: false },
	])

	return (
		<div className="button-container">
			{buttons.map(({ id, name, isActive }) => (
				<FilterButton
					key={id}
					name={name}
					isActive={isActive}
					onFilter={() => {
						onFilter(name)
						setButtons(toggleActiveButton(buttons, name))
					}}
				/>
			))}
		</div>
	)
}
