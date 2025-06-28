import "./FilterButton.css"

export default function FilterButton({ name, isActive, onFilter }) {
	return (
		<button
			type="button"
			className={isActive ? "sort-button active" : "sort-button"}
			onClick={() => onFilter(name)}>
			{name}
		</button>
	)
}
