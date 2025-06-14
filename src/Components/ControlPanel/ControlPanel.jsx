import "./ControlPanel.css"

export default function ControlPanel() {
	return (
		<div className="control-panel">
			<div className="input-container">
				<input
					type="text"
					className="task"
					placeholder="Добавить или найти задачу..."
				/>
				<button className="button add-btn">Добавить</button>
				<button className="button search-btn">Найти</button>
			</div>
			<div className="button-container">
				<div>
					<button type="button" className="button sort-button active">
						А-Я
					</button>
					<button type="button" className="button sort-button">
						Я-А
					</button>
				</div>
				<button type="button" className="button sort-button">
					Отменить
				</button>
			</div>
		</div>
	)
}
