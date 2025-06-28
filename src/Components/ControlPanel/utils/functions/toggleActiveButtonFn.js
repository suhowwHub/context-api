export const toggleActiveButton = (buttons, nameButtonFocus) => buttons.map((button) =>
	button.name === nameButtonFocus ? { ...button, isActive: true } : { ...button, isActive: false }
)
